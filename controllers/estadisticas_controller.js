
var models = require('../models/models.js');

exports.listar = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;

    // Funciona Cuenta de Cuantos Quizes

    instancia1.count().then(function(c){ console.log("Hay "+c+" Registros de Preguntas")});
        // Funciona Cuenta de Cuantos Commentarios

    instancia2.count().then(function(d){ console.log("Hay "+d+" Registros de Comentarios")});


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

  //  Quizes y Comentarios
  // Propiedad required para Inner Join :true

    instancia1.findAll({include: [{model:instancia2, required:false}]}).then(function(quizes){
      // Convertirlo a objeto Json
       var Ajson = JSON.stringify(quizes);
       var Dejson = JSON.parse(Ajson);

      // Contar numero de preguntas sin comentarios ojo opcional console.log(Dejson);

        var x; newcount = 0;
        for (x = 0; x < Object.keys(Dejson).length; x++){

        if (Dejson[x].Comments.length === 0) {
          //  for (Comments in Dejson[x].Comments) {
                newcount++;

            //}
          }
        }

      console.log("Hay " + newcount + " Preguntas Sin respuestas");
    //res.render('views/estadisticas.ejs',{errors: errors});
    //res.redirect("/estadisticas.ejs");
    })
};
