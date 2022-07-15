var group = require("../models/Group");
var post = require("../models/Post");
var mongoose = require("mongoose");
const { auth } = require("./UserService");
var user = require("../models/User");
const Services = require("./Services");

const Group = mongoose.model("Group", group);
const User = mongoose.model("User", user);
const Post = mongoose.model("Post", post);

class GroupService {

    async create(req, res) {
        try {
            var { id } = req.loggedUser;
            var user = await User.find({ "_id": id });
            if (user[0].admin == true) {
                var { nome, descricao } = req.body;

                var newGroup = new Group({
                    id_adm: id,
                    nome,
                    seguidores: [],
                    descricao
                });
                user[0].grupos.push(newGroup.id);
                newGroup.seguidores.push(id);
                await newGroup.save();
                await User.updateOne({ _id: id }, { grupos: user[0].grupos });
                res.status(201).json({ _id: newGroup.id, msg: "Cadastro de grupo realizado com sucesso!" });

            } else {
                res.status(401).json({ msg: "Grupos só podem ser criados por usuários administradores!" });
            }
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao cadastrar o grupo :(", erro: err });
        }
    }

    async getAll(req, res) {
        Services.getAll(req, res, Group, 'grupo')
    }

    async findById(req, res) {
        Services.findById(req, res, Group, 'grupo');
    }

    async findByName(req, res) {
        Services.findByName(req, res, Group, 'grupo');
    }

    async findAllPosts(req,res) {
        try {
            var { id } = req.params;
            var user = await User.find({ _id: req.loggedUser.id })
            var posts = await Post.find({ grupo: id });
            var retornar = false;

            for (let i = 0; i < user[0].grupos.length; i++) {
                var g = user[0].grupos[i];
                if (g._id != undefined && g._id == id) retornar = true;
            }
            if (retornar) {
                res.status(200).json({posts});
            } else {
                res.status(401).json({ msg: "Apenas usuários membros do grupo podem ver as publicações." })
            }
        } catch (error) {
            res.status(500).json({ msg: `Algo deu errado ao buscar pelos posts :(`, erro: error });
        }
    }

    async delete(req, res) {
        try {
            var id = req.params.id;
            var loggedUser = await User.find({ _id: req.loggedUser.id });
            var group = await Group.find({ _id: id });

            if (group[0] != undefined) {
                if (loggedUser[0]._id != group[0].id_adm) {
                    var admin = await User.find({ _id: group[0].id_adm });
                    res.status(401).json({ msg: "Só o usuário administrador que tenha criado o grupo pode deletá-lo.", admin: { nome: admin[0].nome, email: admin[0].email } });
                } else {
                    var users = await User.find()
                    users.forEach(async u => {
                        if (u.grupos.findIndex(g => g._id == id) > -1) {
                            u.grupos.splice(u.grupos.findIndex(g => g._id == id), 1);
                        }
                        await User.updateOne({ _id: u._id }, { grupos: u.grupos });
                    });

                    var result = await Group.deleteOne({ _id: id });
                    if (result.deletedCount == 1) {
                        res.status(200).json({ msg: `Grupo removido com sucesso!` });
                    } else {
                        res.status(400).json({ msg: `Não encontramos o grupo indicado...` })
                    }
                }
            } else {
                res.status(400).json({ msg: `Não encontramos o grupo indicado...` })
            }
        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao tentar deletar o grupo :(`, erro: err });
        }
    }

    async getMembersInfo(req, res) {
        try {
            var id = req.params.id;
            var group = await Group.find({ _id: id });
            if(group[0] != undefined) {
                var membros = []
                for (let i = 0; i < group[0].seguidores.length; i++) {
                    var s = group[0].seguidores[i];
                    var user = await User.find({ _id: s._id });
                    membros.push(user[0]);
                }
                res.status(200).json({ membros });
            }
        } catch (error) {
            res.status(500).json({ msg: `Algo deu errado ao buscar pelos membros do grupo :(`, erro: error });
        }
    }

    async update(req, res) {
        try {
            var { id_adm, nome, descricao } = req.body;
            var { id } = req.params;
            var result = await Group.updateOne({ '_id': id }, { id_adm: id_adm, nome: nome, descricao: descricao });

            if (result.matchedCount == 1) {
                res.status(200).json({ msg: "Informações do grupo atualizadas!" });
            } else {
                res.status(400).json({ msg: "Não encontramos o grupo indicado..." })
            }
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao tentar atualizar o grupo :(", erro: err });
        }
    }

    async manageMember(req, res) {
        try {
            var { action } = req.body;
            var { id_group, id_user } = req.params;
            var loggedUser = await User.find({ "_id": req.loggedUser.id });
            var user = await User.find({ '_id': id_user })
            var grupo = await Group.find({ "_id": id_group });
            if (grupo[0] != undefined) {
                var membros = grupo[0].seguidores;
                var grupos = user[0].grupos;
                var membro = membros.find(m => m._id == id_user);
                var msg = '';
                var status = 200;

                if (loggedUser[0].id == grupo[0].id_adm) {
                    if (action == 'add') {
                        if (membros.length > 0) {
                            if (membro != undefined) {
                                status = 200;
                                msg = "O usuário já é membro do grupo!";
                            } else {
                                membros.push({ '_id': id_user });
                                grupos.push({ '_id': id_group });
                                msg = "Usuário adicionado ao grupo!";
                            }
                        } else {
                            membros.push({ '_id': id_user });
                            grupos.push({ '_id': id_group });
                            msg = "Usuário adicionado ao grupo!";
                        }
                    } else {
                        if (membros.length > 0) {
                            if (membro != undefined) {
                                membros.splice(membros.findIndex(m => m._id == id_user), 1);
                                grupos.splice(grupos.findIndex(g => g._id == id_group), 1);
                                msg = "Usuário removido do grupo!";
                            } else {
                                status = 404;
                                msg = "O usuário não faz parte do grupo!";
                            }
                        } else {
                            status = 200;
                            msg = "O grupo ainda não possui nenhum membro!";
                        }
                    }
                    await Group.updateOne({ '_id': id_group }, { seguidores: membros });
                    await User.updateOne({ '_id': id_user }, { grupos: grupos });
                    res.status(status).json({ msg });

                } else {
                    var admin = await User.find({ _id: grupo[0].id_adm });
                    res.status(401).json({ msg: "É preciso ser um usuário administrador e o criador do grupo para gerenciar os membros dele.", admin: { nome: admin[0].nome, email: admin[0].email } });
                }
            } else {
                res.status(404).json({ msg: "Não encontramos o grupo indicado..." })
            }
        } catch (err) {
            res.status(500).json({ msg: "Não foi possivel cumprir a ação :(", erro: err });
        }

    }

}

module.exports = new GroupService();
