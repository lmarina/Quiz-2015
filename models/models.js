var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
<<<<<<< HEAD
var sequelize = new Sequelize(null, null, null,
=======
var sequelize = New Sequelize(null, null, null,
>>>>>>> 5c2f35ffd2f12f52d13e9fa7fcf6ba1163601f72
                        {dialect: "sqlite", storage: "quiz.sqlite"}
                     );

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definicion de tabla Quiz

//Sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
   // success(..) ejecuta el manejador una vez creada la tabla
   Quiz.count().success(function(count){
     if(count === 0) {  //la tabla se inicializa solo si esta vacia
       Quiz.create({ pregunta: 'Capital de Italia',
                     respuesta: 'Roma'
                   })
       .success(function(){console.log('Base de datos inicializada')});
};
});
});

