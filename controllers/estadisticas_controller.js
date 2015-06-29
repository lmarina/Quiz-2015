var models = require('../models/models.js');

exports.listar = function(req, res) {

    var errors = req.session.errors || {};

    var instancia1 = models.Quiz;
    
    var instancia2 = models.Comment;


    instancia1.count().then(function(c){ console.log("There are "+c+" registers")});

    instancia2.count().then(function(d){ console.log("There are "+d+" registers")});

    instancia1.count({ where: ['contenido ?']}).then(function(e){ console.log("There are "+e+" question without comments")});

    //console.log(instancia2);

	//res.render('views/estadisticas.ejs',{errors: errors});
     
     //res.redirect("/estadisticas.ejs");

};



