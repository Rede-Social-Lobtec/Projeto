var post = require("../models/Post");
var user = require("../models/User");
var mongoose = require("mongoose");
const Services = require("./Services");

const Post = mongoose.model("Post", post);
const User = mongoose.model("User", user);

class PostService {

    async create(req, res) {
        var { tema, descricao, fotoPublicacao, grupo } = req.body;

        var newPost = new Post({
            id_user: req.loggedUser.id,
            tema,
            descricao,
            fotoPublicacao,
            grupo,
            curtidaDetalhe: [],
            comentarios: [],
            data: new Date().toLocaleString(),
            interacoesDoTema: "0"
        });
        
        try {
            await newPost.save();
            res.status(200).json({ msg: "Cadastro de post realizado!" });
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao criar o post :(", erro: err });
        }

    }

    async getAll(req, res) {
        Services.getAll(req, res, Post, 'post');
    }

    async findById(req, res) {
        try {
            var id = req.params.id;
            var post = await Post.find({ '_id': id });

            if (post[0] != undefined) {
                var criador = await User.find({ _id: post[0].id_user });
                var newPost = JSON.parse(JSON.stringify(post[0]));
                newPost["criador"] = criador[0];
                
                res.status(200).json(newPost);
            } else {
                res.status(404).json({ msg: `O post indicado não existe!` })
            }
        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao buscar pelo post :(`, erro: err })
        }
    }

    async findByTheme(req, res) {
        try {
            var { tema } = req.params;
            var allPosts = [];
            var posts = await Post.find({ tema: { $regex: tema, $options: 'i' } });
            if (posts[0] != undefined) {
                var criador = await User.find({ _id: posts[0].id_user });
                if (posts.length == 1) { 
                    var newPost = JSON.parse(JSON.stringify(posts[0]));
                    newPost["criador"] = criador[0];
                    allPosts.push(newPost);
                }
                else { posts.forEach(p => {
                    var newPost = JSON.parse(JSON.stringify(p));
                    newPost["criador"] = criador[0];
                    allPosts.push(newPost);
                })}

                res.status(200).json(allPosts);
            } else {
                res.status(400).json({ msg: `Não encontramos nenhum post com o tema informado!` })
            }
        } catch (err) {
            res.status(500).json({ msg: `Algo deu errado ao buscar pelos posts :(`, erro: err });
        }
    }

    async delete(req, res) {
        try {
            var id = req.params.id;
            var loggedUser = await User.find({ _id: req.loggedUser.id });
            var post = await Post.find({ _id: id });

            if (post[0] != undefined) {
                if (loggedUser[0]._id != post[0].id_user) {
                    var user = await User.find({ _id: post[0].id_user });
                    res.status(401).json({ msg: "Só o usuário que criou a publicação pode deletá-la.", criador: { nome: user[0].nome, email: user[0].email } });
                } else {
                    var tema = post[0].tema;
                    await Post.deleteOne({ _id: id });
                    countTema(tema);
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
            var { tema, descricao, fotoPublicacao } = req.body
            var { id } = req.params;
            var user = req.loggedUser.id;
            var post = await Post.find({ _id: id });

            if (post[0] != undefined) {
                if (post[0].id_user == user) {
                    var result = await Post.updateOne({ '_id': id }, { tema, descricao, fotoPublicacao });
                    if (result.matchedCount == 1) {
                        countTema(tema);
                        res.status(200).json({ msg: "Post atualizado com sucesso!" });
                    } else {
                        res.status(400).json({ msg: "Não encontramos o post indicado..." })
                    }
                } else {
                    res.status(401).json({ msg: "Apenas o usuário que criou o post pode editá-lo!" });
                }
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." })
            }
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao tentar atualizar o post :(", erro: err });
        }
    }

    async returnFeed(req, res) {
        try {
            var user = await User.find({ _id: req.loggedUser.id });
            var usersAdm = await User.find({ admin: true });

            var postsSeguindo = [];
            var postsAdms = [];

            for (let i = 0; i < usersAdm.length; i++) {
                var adm = usersAdm[i];
                if (adm._id != user[0].id) {
                    var post = await Post.find({ id_user: adm._id });
                    if (post[0] != undefined) {
                        var criador = await User.find({ _id: post[0].id_user });
                        if (post.length == 1) { 
                            var newPost = JSON.parse(JSON.stringify(post[0]));
                            newPost["criador"] = criador[0];
                            postsAdms.push(newPost); 
                        } else { 
                            post.forEach(p => {
                                var newPost = JSON.parse(JSON.stringify(p));
                                newPost["criador"] = criador[0];
                                postsAdms.push(newPost)
                            })
                        }
                    }
                }
            }

            for (let i = 0; i < user[0].seguindo.length; i++) {
                var seguindo = user[0].seguindo[i];
                var post = await Post.find({ id_user: seguindo._id });
                if (post[0] != undefined) {
                    var criador = await User.find({ _id: post[0].id_user }); 
                    if (!criador[0].admin) {
                        if (post.length == 1) {
                            var newPost = JSON.parse(JSON.stringify(post[0]));
                            newPost["criador"] = criador[0];
                            postsSeguindo.push(newPost);
                        } else {
                            post.forEach(p => {
                                var newPost = JSON.parse(JSON.stringify(p));
                                newPost["criador"] = criador[0];
                                postsSeguindo.push(newPost);
                            })
                        }
                    }
                }
            }

            var feed = postsAdms.concat(postsSeguindo);

            function formatDate(data) {
                let date = data.split(" ");
                let newDate = date[0].split("/");
                let year = newDate[2];
                let month = newDate[1];
                let day = newDate[0];
                
                return [year, month, day, date[1]].join(" ");
            }
            
            function newFormatDate(array) {
            var resultado = array.sort(function (a, b) {
                return new Date(formatDate(b.data)) - new Date(formatDate(a.data));
            });
            return resultado
            }

            newFormatDate(feed);
            // feed = feed.sort(function(a,b) {
            //     return new Date(dataFormat(b.data)[2], dataFormat(b.data)[1], dataFormat(b.data)[0]) - new Date(dataFormat(a.data)[2], dataFormat(a.data)[1], dataFormat(a.data)[0]) 
            // });
            res.status(200).json(feed);
        } catch (erro) {
            res.status(500).json({ msg: "Algo deu errado ao tentar retornar o feed :(", erro: erro });
        }
    }

    async findAllThemes(req, res) {
        try {
            var temas = [];
            var posts = await Post.find();

            for (let i = 0; i < posts.length; i++) {
                const tema = posts[i].tema;
                if (temas.length == 0) {
                    temas.push(tema);
                } else {
                    if (!temas.includes(tema)) {
                        temas.push(tema);
                    }
                }
            }
            res.status(200).json(temas);
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar retornar os temas :(", erro: error });
        }
    }

    async manageLike(req, res) {
        try {
            var { id } = req.params;
            var id_user = req.loggedUser.id;
            var post = await Post.find({ _id: id });

            if (post[0] != undefined) {
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
            } else {
                res.status(400).json({ msg: "Não conseguimos encontrar o post indicado :(" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar completar esta ação :(", erro: err });
        }
    }

    async addComment(req, res) {
        try {
            var { id } = req.params;
            var { texto } = req.body;
            var id_user = req.loggedUser.id;
            var post = await Post.find({ "_id": id });

            if (post[0] != undefined) {
                var comentarios = post[0].comentarios;
                var comentarios = post[0].comentarios;
                var tema = post[0].tema;

                comentarios.push({ idUser: id_user, texto: texto, data: new Date().toLocaleString() });
                var result = await Post.updateOne({ _id: id }, { comentarios: comentarios });
                if (result.matchedCount == 1) {
                    res.status(200).json({ msg: "Comentário adicionado à publicação!" });
                    countTema(tema);
                } else {
                    res.status(400).json({ msg: "Não encontramos o post indicado..." });
                }
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." });
            }
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
                var tema = post[0].tema;

                if (userComments[0] != undefined) {
                    comentarios.splice(comentarios.findIndex(c => c._id == id_comment), 1);
                    var result = await Post.updateOne({ _id: id_post }, { comentarios: comentarios });
                    if (result.matchedCount == 1) {
                        res.status(200).json({ msg: "Comentário removido da publicação!" });
                        countTema(tema);
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

    // endpoint que retorna as informações dos usuários que curtiram o post e os comentários
    async getAllInteractions(req, res) {
        try {
            var { id } = req.params;
            var post = await Post.find({ _id: id });
            if (post[0] != undefined) {
                var idsUsers = post[0].curtidaDetalhe, comments = post[0].comentarios;
                var users = [], comentarios = [];
                if (idsUsers.length > 0) {
                    for (let i = 0; i < idsUsers.length; i++) {
                        var iduser = idsUsers[i];
                        var user = await User.find({ _id: iduser });
                        users.push(user[0]);
                    }
                } 
                if (comments.length > 0) {
                    for (let i = 0; i < comments.length; i++) {
                        var c = comments[i];
                        var user = await User.find({ _id: c.idUser });
                        var newComment = JSON.parse(JSON.stringify(c));
                        newComment["usuario"] = user[0];
                        comentarios.push(newComment);
                    }
                } 
                res.status(200).json({likes: users, comments: comentarios});
            } else {
                res.status(400).json({ msg: "Não encontramos o post indicado..." });
            }
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar buscar as informações de curtidas :(", erro: error });
        }
    }

    async getPostsByUserId(req, res) {
        try {
            var { id } = req.params;
            var posts = await Post.find({ id_user: id });
            if (posts[0] != undefined) {
                if (posts.length > 0) {
                    res.json(posts);
                } else {
                    res.send('O usuário ainda não fez nenhuma publicação!')
                }
            }
        } catch (err) {
            res.status(500).json({ msg: "Algo deu errado ao tentar buscar suas publicações :(", erro: error });
        }
    }

    async getMaxTema(req, res) {
        try {
            var posts = await Post.find();

            if (posts[0] != undefined) {
                var lista = [];
                for (let i = 0; i < posts.length; i++) {
                    if (parseInt(posts[i].interacoesDoTema) > 0) {
                        lista.push(parseInt(posts[i].interacoesDoTema));
                    }
                }
                if (lista.length > 0) {
                    var max = Math.max(...lista);
                    var temaMax = await Post.find({ interacoesDoTema: max.toString() }, { tema: 1 }).limit(1);
                    var tema = temaMax[0].tema;

                    res.json({ msg: `Maior numero de interações: ${max} no tema: ${tema}` });
                } else {
                    res.status(200).json({ msg: "Ainda não temos nenhum post com interações!" });
                }

            } else {
                res.status(200).json({ msg: "Ainda não há nenhum post na rede social para que haja interações." })
            }
        } catch (error) {
            res.status(500).json({ msg: "Algo deu errado ao tentar buscar o tema com mais interações...", erro: error });
        }
    }

}

async function countTema(tema) {

    try {
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
    } catch (error) {
        res.status(500).json({ msg: "Algo deu errado ao tentar fazer a contagem de interações por tema :(", erro: error });
    }

}



module.exports = new PostService();