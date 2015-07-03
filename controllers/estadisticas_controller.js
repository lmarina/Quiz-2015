
var models = require('../models/models.js');

exports.listar = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;

    // Funciona Cuenta de Cuantos Quizes
    /*
    instancia1.count().then(function(c){ console.log("There are "+c+" registers for Quiz")});
    */

    // Funciona Cuenta de Cuantos Commentarios
    /*
    instancia2.count().then(function(d){ console.log("There are "+d+" registers for Comments")});
    */

    // Funciona Cuenta de comentarios por preguntas
    /*
    instancia2.count({ where: {QuizId: 1}}).then(function(i){ console.log("There are "+i+" i")});
    instancia2.count({ where: {QuizId: 2}}).then(function(j){ console.log("There are "+j+" j")});
    instancia2.count({ where: {QuizId: 3}}).then(function(k){ console.log("There are "+k+" k")});
    */

    // Funciona
    /*
    instancia1.all().then(function(projects) {
          console.log(projects);
    })
    */

/*
    instancia1.findAll({include:instancia2}).then(function(comments){
      console.log(JSON.stringify(comments))
    })
*/

  // Inner Join entre Quizes y Comentarios

    instancia1.findAll({include: [{model:instancia2, required:true}]}).then(function(quizes){
      // Convertirlo a objeto Json
       var Ajson = JSON.stringify(quizes);
       var Dejson = JSON.parse(Ajson);

      // Contar numero de comentarios totales

        var x; newcount = 0;
        for (x = 0; x < Object.keys(Dejson).length; x++){

            for (Comments in Dejson[x].Comments) {
                newcount++;
            }
        }

        console.log(newcount);

    //res.render('views/estadisticas.ejs',{errors: errors});
    //res.redirect("/estadisticas.ejs");
    })
};
