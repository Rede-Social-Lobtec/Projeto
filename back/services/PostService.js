var post = require("../models/Post");
var user = require("../models/User");
var mongoose = require("mongoose");
const Services = require("./Services");

const Post = mongoose.model("Post", post);
const User = mongoose.model("User", user);

class PostService {

    async create(req, res) {
        var { tema, descricao, fotoPublicacao, curtidaDetalhe, comentarios, data } = req.body;

        var newPost = new Post({
            id_user: req.loggedUser.id,
            tema,
            descricao,
            fotoPublicacao,
            curtidaDetalhe,
            comentarios,
            data,
            interacoesDoTema: "0"
        });
        try {
            await newPost.save();
            res.status(200).json({ msg: "Cadastro de post realizado!" });
            return true;
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao criar o post :(", erro: err });
        }

    }

    async getAll(req, res) {
        Services.getAll(req, res, Post, 'post');
    }

    async findById(req, res) {
        Services.findById(req, res, Post, 'post');
    }

    async delete(req, res) {
        try {
            var id = req.params.id;
            var loggedUser = await User.find({ _id: req.loggedUser.id });
            var post = await Post.find({ _id: id });

            if (post[0] != undefined) {
                if (loggedUser[0]._id != post[0].id_user) {
                    var admin = await User.find({ _id: post[0].id_user });
                    res.status(401).json({ msg: "Só o usuário administrador que tenha criado o grupo pode deletá-lo.", admin: { nome: admin[0].nome, email: admin[0].email } });
                } else {
                    await Group.deleteOne({ _id: id });
                    res.status(200).json({ msg: `Post removido com sucesso!` });
                }
            } else {
                res.status(400).json({ msg: `Não encontramos o post indicado...` })
            }
        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao tentar deletar o post :(`, erro: err });
        }
    }

    async update(req, res) {
        try {
            var { id_user, tema, descricao, fotoPublicacao, data } = req.body
            var id = req.params.id;

            var result = await Post.updateOne({ '_id': id }, { id_user, tema, descricao, fotoPublicacao, data });
            if (result.matchedCount == 1) {
                res.status(200).json({ msg: "Post atualizado com sucesso!" });
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." })
            }
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao tentar atualizar o post :(", erro: err });
        }
    }

    async manageLike(req, res) {
        try {
            var { id } = req.params;
            var id_user = req.loggedUser.id;
            var post = await Post.find({ _id: id });
            var tema = post[0].tema;
            var curtidas = post[0].curtidaDetalhe;
            var remover = false;
            var msg = "Você curtiu a publicação!";

            if (curtidas.length > 0) {
                curtidas.forEach(c => {
                    if (c._id == id_user) {
                        remover = true;
                        msg = 'Sua curtida foi retirada da publicação!';
                    }
                })
                if (remover == true) {
                    curtidas.splice(curtidas.findIndex(c => c._id == id_user), 1);
                } else {
                    curtidas.push({ "_id": id_user })
                }
            } else {
                curtidas.push({ "_id": id_user })
            }
            await Post.updateOne({ "_id": id }, { curtidaDetalhe: curtidas })
            countTema(tema);
            res.status(200).json(msg)
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar adicionar a sua curtida :(", erro: err });
        }
    }

    async addComment(req, res) {
        try {
            var { id } = req.params;
            var { texto } = req.body;
            var id_user = req.loggedUser.id;
            var post = await Post.find({ "_id": id });
            var comentarios = post[0].comentarios;
            var tema = post[0].tema;

            if (post[0] != undefined) {
                var comentarios = post[0].comentarios;

                comentarios.push({ idUser: id_user, texto: texto, data: new Date().toLocaleString() });
                var result = await Post.updateOne({ _id: id }, { comentarios: comentarios });
                if (result.matchedCount == 1) {
                    res.status(200).json({ msg: "Comentário adicionado à publicação!" });
                } else {
                    res.status(400).json({ msg: "Não encontramos o post indicado..." });
                }
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." });
            }
            countTema(tema);
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar adicionar o seu comentário :(", erro: err });
        }
    }

    async deleteComment(req, res) {
        try {
            var { id_post, id_comment } = req.params;
            var idUser = req.loggedUser.id;
            var post = await Post.find({ _id: id_post });

            if (post[0] != undefined) {
                var comentarios = post[0].comentarios;
                var userComments = post[0].comentarios.filter(c => c.idUser == idUser);

                if (userComments[0] != undefined) {
                    comentarios.splice(comentarios.findIndex(c => c._id == id_comment), 1);
                    var result = await Post.updateOne({ _id: id_post }, { comentarios: comentarios });
                    if (result.matchedCount == 1) {
                        res.status(200).json({ msg: "Comentário removido da publicação!" });
                    } else {
                        res.status(400).json({ msg: "Não encontramos o post indicado..." });
                    }
                } else {
                    res.status(400).json({ msg: "Não encontramos seu comentário neste post..." });
                }
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." });
            }

        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar remover o seu comentário :(", erro: error });
        }
    }

    async getAllLikes(req, res) {
        var { id } = req.params;
        var post = await Post.find({ _id: id });
        var idsUsers = post[0].curtidaDetalhe;
        var users = [];

        try {
            if (idsUsers.length > 0) {
                //users = await getUsers(idsUsers, users);
                idsUsers.forEach(async id => {
                    var user = await User.find({ _id: id });
                    console.log();
                    users.push(user[0]);
                });
                setTimeout(() => { res.json(users) }, 200);
                // res.json(users);
            } else {
                res.send("O post ainda não possui nenhuma curtida!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getPostsByUserId(req, res) {
        try {
            var { id } = req.loggedUser;
            var posts = await Post.find({ id_user: id });
            if (posts.length > 0) {
                res.json(posts);
            } else {
                res.send('O usuário ainda não fez nenhuma publicação!')
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getMaxTema(req, res) {
        var posts = await Post.find();
        var lista = [];
        for (let i = 0; i < posts.length; i++) {
            if (parseInt(posts[i].interacoesDoTema) > 0) {
                lista.push(parseInt(posts[i].interacoesDoTema));
            }
        }
        var max = Math.max(...lista);
        var temaMax = await Post.find({interacoesDoTema: max.toString()}, {tema: 1}).limit(1);
        var tema = temaMax[0].tema;

        res.send(`Maior numero de interações: ${max} no tema: ${tema}`);
    }

}

async function getUsers(idsUsers, users) {
    await idsUsers.forEach(async (id) => {
        var user = await User.find({ _id: id });
        users.push(user[0]);
    });
    return users;
}

async function countTema(tema) {

    var posts = await Post.find({ tema: tema });
    var numCurtidas = 0;
    var numComentarios = 0;
    var lista = [
        {
            interacoes
        }
    ]
    for (let i = 0; i < posts.length; i++) {

        if (posts[i].tema == tema) {
            var resultCurtidas = await Post.find({ "tema": tema }).sort({ curtidaDetalhe: 1 });
            numCurtidas += (resultCurtidas[i].curtidaDetalhe).length;
            var resultComentarios = await Post.find({ "tema": tema }).sort({ comentarios: 1 });
            numComentarios += (resultComentarios[i].comentarios).length;
        }
    }
    var interacoes = numCurtidas + numComentarios;
    var lista = await Post.find({ "interacoesDoTema": interacoes }).sort();
    lista.push(interacoes);
    await Post.updateMany({ "tema": tema }, { interacoesDoTema: interacoes.toString() });

}



module.exports = new PostService();