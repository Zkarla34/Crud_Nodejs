var usuariosModel = require("../modelos/usuariosModel").usuarios


var usuariosController = {}

usuariosController.Guardar = function(request,response)
{
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:sha256(request.body.password + config.secretpassword)
        confirmar:sha256(request.body.confirmar + config.secretpassword)
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == '')
    {
        response.json({state:false,mensaje:'El campo nombre es obligatorio'})
        return;
    }

     if(post.email == undefined || post.email == null || post.email == '')
    {
        response.json({state:false,mensaje:'El campo email es obligatorio'})
        return;
    }

     if(post.password == undefined || post.password == null || post.password == '')
    {
        response.json({state:false,mensaje:'El campo password es obligatorio'})
        return;
    }

     if(post.confirmar == undefined || post.confirmar == null || post.confirmar == '')
    {
        response.json({state:false,mensaje:'El campo confirmar es obligatorio'})
        return;
    }

    if(post.password != post.confirmar)
    {
        response.json({state:false, mensaje:'El campo confirmar y password no coinciden'})
    }

    console.log(post)

    usuariosModel.Guardar(post,function(respuesta)
    {
        if(respuesta.state == true)
        {
            response.json({state:true, mensaje:'Usuario creado correctamente'})
        }
        else
        {
            response.json({state:false, mensaje:' Error al crear usuario'})
        }
    })
}

usuariosController.Listar = function(request, response)
{
    usuariosModel.Listar(null, function(respuesta)
        {
            response.json(respuesta)
        })   
}

usuariosController.ListarId = function(request, response)
{
    var post = {
        id:request.body.id
    }
    if(post.id == undefined || post.id  == null || post.id=='')
    {
        response.json({state:false, mensaje:'El campo Id es obligatorio'})
        return;
    }
    usuariosModel.ListarId(post,function(respuesta)
    {
        response.json(respuesta)
    })
}

usuariosController.Actualizar = function(request, response)
{
    var post = {
        nombre:request.body.nombre,
        id: request.body.id
    }
    if(post.nombre == undefined || post.nombre  == null || post.nombre=='')
    {
        response.json({state:false, mensaje:'El campo nombre es obligatorio'})
        return;
    }
    if(post.id == undefined || post.id  == null || post.id=='')
    {
        response.json({state:false, mensaje:'El campo Id es obligatorio'})
        return;
    }
    usuariosModel.Actualizar(post,function(respuesta)
    {
        if(respuesta.state == true)
        {
            response.json({state:true, mensaje:'Usuario se actualizo correctamente'})
        }
        else
        {
            response.json({state:false, mensaje:'Se presento un error al actualizar', info:respuesta.info})
        }
    })
}

usuariosController.Elimiar = function(request, response)
{
    var post ={
        id:request.body.id
    }
    if(post.id == undefined || post.id  == null || post.id=='')
    {
        response.json({state:false, mensaje:'El campo Id es obligatorio'})
        return;
    }
    usuariosModel.Eliminar(post,function(respuesta)
    {
        if(respuesta.state == true)
        {
            response.json({state:true, mensaje:'Usuario eliminado correctamente'})
        }
        else
        {
            response.json({state:false, mensaje:'Se presento un error al eliminar', info:respuesta.info})
        }
    })
}

usuariosController.Login = function(request, response)
{
    var post = {
        email:request.body.email,
        password:sha256(request.body.password + config.secretpassword)
    }

    if(post.email == undefined || post.email == null || post.email == '')
    {
        response.json(state:false, mensaje:'El campo email es obligatio')
        return;
    }

    if(request.body.password == undefined || request.body.password == null || request.body.password == '')
    {
        response.json({state:false, mensaje:'El campo password es obligatorio'})
        return
    }

    usuariosModel.Login(post, function(respuesta) 
    {
        if(respuesta[0].password == post.password)
        {
            response.json({state:true, mensaje:'Bienvenido', id:respuesta[0].id})
        }
        else
        {
            response.json({status:false, mensaje:'Usuario o password incorrectos'})
        }
    })
}
module.exports.usuarios = usuariosController