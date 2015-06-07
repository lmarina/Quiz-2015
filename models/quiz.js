// Define el modelo Quiz

module.exports = function(sequelize, DataTypes) {
>>>>>>> 5c2f35ffd2f12f52d13e9fa7fcf6ba1163601f72
   return sequelize.define('Quiz',
             { pregunta: DataTypes.STRING,
               respuesta: DataTypes.STRING,
             });
}

