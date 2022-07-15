var user = require("../models/User");
var group = require("../models/Group");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { createLog } = require("./LogSessaoService");
const Services = require("./Services");
const JWTSecret = "Starwars";

const User = mongoose.model("User", user);
const Group = mongoose.model("Group", group);

class UserService {

    async create(req, res) {
        try {
            var { nome, departamento, cargo, email, data_nascimento,
                telefone, admin, foto, senha } = req.body;

            var newUser = new User({
                nome,
                departamento,
                cargo, email,
                data_nascimento,
                telefone,
                admin,
                foto,
                senha,
                seguindo: [],
                seguidores: [],
                grupos: []
            });
            var users = await User.find();
            var status = 200;
            var msg = "Usuário cadastrado com sucesso!";

            if (users.length > 0) {
                users.forEach(u => {
                    if (u.email == newUser.email) {
                        status = 401;
                        msg = 'E-mail já cadastrado no sistema!'
                    }
                })
            }
            if (status == 200) await newUser.save();
            var token = jwt.sign({ id: newUser.id, email: newUser.email },
                JWTSecret, { expiresIn: '5h' });
            createLog(newUser.id);

            res.status(status).json({ msg, id: newUser._id, token });
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao cadastrar o usuário :(", erro: err })
        }

    }

    async getAll(req, res) {
        Services.getAll(req, res, User, 'usuário');
    }

    async findById(req, res) {
        Services.findById(req, res, User, 'usuário');
    }

    async findByName(req, res) {
        Services.findByName(req, res, User, 'usuário');
    }

    async delete(req, res) {
        try {
            var id = req.params.id;
            var user = await User.find({ _id: id });
            var loggedUser = await User.find({ _id: req.loggedUser.id });

            if (user[0] != undefined) {
                var groups = await Group.find();
                groups.forEach(async g => {
                    if (g.seguidores.findIndex(u => u._id == id) > -1) {
                        g.seguidores.splice(g.seguidores.findIndex(u => u._id == id), 1);
                    }
                    await Group.updateOne({ _id: g._id }, { seguidores: g.seguidores });
                });
                var users = await User.find();
                users.forEach(async user => {
                    if (user.seguindo.findIndex(u => u._id == id) > -1) {
                        user.seguindo.splice(user.seguindo.findIndex(u => u._id == id), 1);
                    }
                    await User.updateOne({ _id: user._id }, { seguindo: user.seguindo });
                });
                users.forEach(async user => {
                    if (user.seguidores.findIndex(u => u._id == id) > -1) {
                        user.seguidores.splice(user.seguidores.findIndex(u => u._id == id), 1);
                    }
                    await User.updateOne({ _id: user._id }, { seguidores: user.seguidores });
                });
                var result = await User.deleteOne({ _id: id });
                if (result.deletedCount == 1) {
                    res.status(200).json({ msg: `Remoção da conta concluída com sucesso!` });
                } else {
                    res.status(400).json({ msg: `Não encontramos o usuário indicado...` })
                }

            } else {
                res.status(400).json({ msg: `Não encontramos o usuário indicado...` })
            }
        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao tentar deletar o usuário :(`, erro: err });
        }
    }

    async update(req, res) {
        try {
            var { nome, departamento, cargo, email, data_nascimento,
                telefone, admin, foto, senha } = req.body;
            var id = req.params.id;
            var loggedUser = await User.find({ _id: req.loggedUser.id });
            var user = await User.find({ _id: id });

            if (user[0] != undefined) {
                var result = await User.updateOne({ '_id': id }, {
                    nome: nome, departamento: departamento, cargo: cargo,
                    email: email, data_nascimento: data_nascimento, telefone: telefone, admin: admin, foto: foto, senha: senha
                });
                if (result.matchedCount == 1) {
                    res.status(200).json({ msg: "Informações do usuário atualizadas!" });
                } else {
                    res.status(400).json({ msg: "Não encontramos o usuário indicado..." })
                }

            } else {
                res.status(400).json({ msg: "Não encontramos o usuário indicado..." })
            }

        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao tentar editar os dados do usuário :(`, erro: err });
        }
    }

    async token(req, res) {
        // Swagger 
        // #swagger.tags = ["users"]

        // #swagger.summary = "autenticação de usuário"

        // #swagger.description = "Rota responsável por autenticar um usuário na Rede Social."

        // #swagger.operationId = "UserAuth"
        /*
            #swagger.parameters['input'] = {
                in: 'body',
                description: 'E-mail e senha do usuário.',
                required: true,
                schema: {
                    $email: 'timoteo@lob.com',
                    $senha: 4124241
                }
            }
        */

        var { email, senha } = req.body;
        console.log(email);
        console.log(senha);
        var user = await User.find({ email: email });
        if (user[0] != undefined) {
            var id = user[0].id;
            if (user[0].senha == senha) {
                try {
                    var token = jwt.sign({ id: id, email: user[0].email },
                        JWTSecret, { expiresIn: '5h' });
                    createLog(id);
                    res.status(200).json({ token: token, id: id });
                } catch (err) {
                    res.status(400).json({ erro: "Houve uma falha interna..." });
                }
            } else {
                res.status(401).json({ erro: "Senha incorreta" });
            }
        } else {
            res.status(401).json({ erro: "Não encontramos nenhum usuário com o e-mail informado." });
        }

    }

    async google(req, res) {
        var { email } = req.body;
        var user = await User.find({ email: email });
        if (user[0] != undefined) {
            var id = user[0].id;
            try {
                var token = jwt.sign({ id: id, email: user[0].email },
                    JWTSecret, { expiresIn: '5h' });
                createLog(id);
                res.status(200).json({ token: token, id: id });
            } catch (err) {
                res.status(400).json({ erro: "Houve uma falha interna..." });
            }
        } else {
            res.status(401).json({ erro: "Não encontramos nenhum usuário com o e-mail informado." });
        }
    }

    async auth(req, res, next) {
        const authToken = req.headers['authorization'];

        if (authToken != undefined) {

            const bearer = authToken.split(' ');
            var token = bearer[1];

            jwt.verify(token, JWTSecret, (erro, data) => {
                if (erro) {
                    res.status(401).json({ erro: "Token inválido!" });
                } else {
                    req.token = token;
                    req.loggedUser = { id: data.id, email: data.email };
                    next();
                }
            });
        } else {
            res.status(401).json({ erro: "Token necessário para autenticar o usuário." });
        }
    }

    async manageFollowing(req, res) {
        try {
            var id = req.loggedUser.id;
            var loggedUser = await User.find({ _id: id });
            var seguindo = loggedUser[0].seguindo;

            var { id_user } = req.body;
            var userToFollow = await User.find({ _id: id_user });
            var seguidores = userToFollow[0].seguidores;

            var remover = false;
            var msg = "Você seguiu o usuário!";

            if (userToFollow[0] != undefined) {
                if (seguindo.length > 0) {
                    seguindo.forEach(s => {
                        if (s._id == id_user) {
                            remover = true;
                            msg = 'Você não está mais seguindo este usuário!';
                        }
                    })
                    if (remover == true) {
                        seguindo.splice(seguindo.findIndex(s => s._id == id_user), 1);
                        seguidores.splice(seguidores.findIndex(s => s._id == id), 1);
                    } else {
                        seguindo.push({ _id: id_user });
                        seguidores.push({ _id: id });
                    }
                } else {
                    seguindo.push({ _id: id_user });
                    seguidores.push({ _id: id });
                }
                await User.updateOne({ _id: id }, { seguindo: seguindo });
                await User.updateOne({ _id: id_user }, { seguidores: seguidores });

                res.status(200).json({ msg })
            } else {
                res.status(400).json({ msg: "Não encontramos o usuário indicado :(" });
            }
        } catch (error) {
            res.status(500).json({ msg: `Algo deu errado ao tentar concluir a ação :(`, erro: error });
        }

    }

    async getSocialInfo(req, res) {
        try {
            var user = await User.find({ _id: req.loggedUser.id });
            if (user[0] != undefined) {
                var seguidores = [];
                var seguindo = [];
                var grupos = [];

                for (let i = 0; i < user[0].seguidores.length; i++) {
                    var s = user[0].seguidores[i];
                    var seguidor = await User.find({ _id: s })
                    seguidores.push(seguidor[0]);
                }
                for (let i = 0; i < user[0].seguindo.length; i++) {
                    var s = user[0].seguindo[i];
                    var segue = await User.find({ _id: s })
                    seguindo.push(segue[0]);
                }
                for (let i = 0; i < user[0].grupos.length; i++) {
                    var g = user[0].grupos[i];
                    var grupo = await Group.find({ _id: g });
                    grupos.push(grupo[0]);
                }
                res.json({ grupos: grupos, seguidores: seguidores, seguindo: seguindo });
            } else {
                res.status(400).json({ msg: "Não encontramos o usuário indicado :(" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar recuperar os dados :(", erro: error });
        }
    }

}

module.exports = new UserService();
