const { Sequelize } = require('sequelize');

// Configura tu conexión a la base de datos (ajusta los valores según tu configuración)
const sequelize = new Sequelize('Juego_de_caballos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
