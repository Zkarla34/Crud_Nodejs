var express = require('express')
//var app = express()
global.app = express() // es global
global.config = require('./config.js').config
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/'+ config.bd,{useNewurlParser:true,useUnifiedTopology:true},(error,response) =>
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log('conexión correcta a mongo')
    }
})

require('./Routes/rutas.js')

app.listen(config.puerto, function()
{
    console.log('Servidor funcionando en el puerto ' + config.puerto)
})