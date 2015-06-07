// Define el modelo Quiz

module.exports = function(sequelize, DataType) {
   return sequelize.define('Quiz',
             { pregunta: DataTypes.STRING,
               respuesta: DataTypes.STRING,
             });
}

