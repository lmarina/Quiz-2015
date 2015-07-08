
var models = require('../models/models.js');

exports.listar = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;

    // Funciona Cuenta de Cuantos Quizes

   instancia1.count().then(function(c){console.log(c)});
        // Funciona Cuenta de Cuantos Commentarios


    var c2 = instancia2.count().then(function(d){ return d});

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
   
    }).then(res.render('estadisticas/estadisticas.ejs', { newcount:0, errors:[]}))
};
