const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
var cors = require('cors');

const router = require("./routes/routes");
const swaggerFile = require('./swagger/swagger_output.json');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://gi_mello:root@cluster0.luuic.mongodb.net/test", 
{useNewUrlParser: true, 
useUnifiedTopology: true});

app.use("/", router);

app.get("/", (req, res)=>{
    // #swagger.tags = ["home"]
    res.send("Oi!");
});

app.listen(8686,() => {
    console.log("Servidor rodando...")
});



