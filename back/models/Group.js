const mongoose = require("mongoose");

const groupModel = new mongoose.Schema({

    id_adm: String,
    nome: String,
    descricao: String,
    seguidores:[
        {
            id: String
        }
    ],
});

module.exports = groupModel;
