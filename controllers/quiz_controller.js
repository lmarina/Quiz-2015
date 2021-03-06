var models = require('../models/models.js')

//Autoload - Factoriza el código si ruta incluye: quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({where: {id: Number(quizId)},
                    include: [{model:models.Comment}]
                    }).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next( new Error ('No Existe quizId='+ quizId));}
    }
  ).catch(function(error) { next(error);})
};

// GET /quizes/

exports.index = function(req,res) {

  if(req.query.search) {
       models.Quiz.findAll({where:["pregunta like ?", '%'+req.query.search+'%']}).then(function(quizes) {
       res.render('quizes/index', {quizes: quizes, errors:[]});
     }).catch(function(error) { next(error);});
} else {
  models.Quiz.findAll().then (
    function(quizes) {
  res.render('quizes/index',{ quizes: quizes, errors:[]});
}
).catch(function(error) { next(error);})
};
};



// GET /quizes/:id
exports.show = function(req, res) {
        res.render('quizes/show',{ quiz: req.quiz, errors:[]});
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
       resultado = 'correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta:resultado, errors:[]});
};


// GET /quizes/new

exports.new = function(req,res) {
     var quiz = models.Quiz.build( //Crea Objeto Quiz
     {pregunta:"Pregunta", respuesta:"Respuesta", contenido:"contenido"}
   );
   res.render('quizes/new', {quiz: quiz, errors:[]});
};

// POST /quizes/create
/* Modificaciones al codigo original por fallas de la version de Serialize */
/* Vuelta al codigo original */
exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz);

  //save: Guarda en DB campos pregunta y respuesta de Quiz
   quiz
   .validate()
   .then(
      function(err) {
         if (err) {
           res.render('quizes/new', {quiz:quiz, errors: err.errors});
         } else {
            quiz
            .save({fields: ["pregunta","respuesta","contenido"]})
            .then( function(){ res.redirect('/quizes')});
          } // res.redirect: redireccion HTTP a la lista de pregunta
        }
      );
   };

// GET /quizes/:id/edit
exports.edit =  function(req, res){
   var quiz = req.quiz; //autoload de instancia Quiz

   res.render('quizes/edit', {quiz:quiz, errors:[]});

};

// PUT /quizes/:id

exports.update = function(req,res) {
   req.quiz.pregunta  = req.body.quiz.pregunta;
   req.quiz.respuesta = req.body.quiz.respuesta;
   req.quiz.contenido = req.body.quiz.contenido;

   req.quiz
   .validate()
   .then (
      function(err) {
        if (err) {
           res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        } else {
             req.quiz // save: Guarda campos pregunta y respuesta en DB
             .save( {fields: ["pregunta", "respuesta","contenido"]})
             .then( function() { res.redirect('/quizes');});
        } // Redireccion http  a lista de Pregunta URL relativo
      }
    );
  };

// DELETE /quizes/:id
exports.destroy = function(req,res){
   req.quiz.destroy().then( function() {
      res.redirect('/quizes');
    }).catch(function(error) {next(error)});
  };
