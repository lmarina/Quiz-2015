
var models = require('../models/models.js');
var async = require('async');


exports.listar = function(req, res) {
    var errors = req.session.errors || {};
   res.render('estadisticas/estadisticas.ejs', { newcount:1, comentariosx:1,sincomentariosx:1, errors:[]})
  };

exports.listar996 = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;
    var newcount = 0; comentariosx=0;sincomentariosx=0;

    instancia1.count().then(function(c){ console.log(c)})

    instancia2.count().then( function (d){
    res.render('estadisticas/estadisticas.ejs', { newcount:d, comentariosx:1,sincomentariosx:1, errors:[]})
    })

  };


exports.listar998 = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;
    var newcount = 0; comentariosx=0;sincomentariosx=0;
    var contado = {};

    // Funciona Cuenta de Cuantos Quizes

   async.auto({
     cb1: function(next) {
          return instancia1.count().then(function(c){ return c});
          callback(c);
         },

     cb2: ['cb1', function(next){
   // Funciona Cuenta de Cuantos Commentarios
         return instancia2.count().then(function(d){return d } );
         callback(d);
      }]
  //  Quizes y Comentarios
  // Propiedad required para Inner Join :true
}, function(results){

        var c=results.instancia1;
        var d=results.instancia2;
        console.log(c);
        console.log(d);

        instancia1.findAll({include: [{model:instancia2, required:false}]}).then(function(quizes){

       // Convertirlo a objeto Json
       var Ajson = JSON.stringify(quizes);
       var Dejson = JSON.parse(Ajson);

       // Contar numero de preguntas sin comentarios ojo opcional console.log(Dejson);

        var x;
        for (x = 0; x < Object.keys(Dejson).length; x++){

        if (Dejson[x].Comments.length === 0) {
                newcount++;
                console.log(newcount);
          }
        }

    })


  })
   res.render('estadisticas/estadisticas.ejs', { newcount:newcount,comentariosx:c,sincomentariosx:d, errors:[]})
  };



exports.alistar999 = function(req, res) {
    var errors = req.session.errors || {};
    var instancia1 = models.Quiz;
    var instancia2 = models.Comment;
    var newcount = 0; comentariosx=0;sincomentariosx=0;

    // Funciona Cuenta de Cuantos Quizes




   // Funciona Cuenta de Cuantos Commentarios



  //  Quizes y Comentarios
  // Propiedad required para Inner Join :true


  instancia1.count().then(function(c){return c}).then(
  instancia2.count().then(function(d){ return d})).then(
  instancia1.findAll({include: [{model:instancia2, required:false}]}).then(function(quizes){

       // Convertirlo a objeto Json
       var Ajson = JSON.stringify(quizes);
       var Dejson = JSON.parse(Ajson);

       // Contar numero de preguntas sin comentarios ojo opcional console.log(Dejson);

        var x;
        for (x = 0; x < Object.keys(Dejson).length; x++){

        if (Dejson[x].Comments.length === 0) {
                newcount++;
          }
        }
        return (console.log(newcount + c + d));
    } ))
    res.render('estadisticas/estadisticas.ejs', { newcount:newcount, errors:[]})

  };
