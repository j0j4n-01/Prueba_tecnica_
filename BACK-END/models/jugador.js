const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Jugador extends Model {}

Jugador.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    juegos_win: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'Jugadores',
    timestamps: false // No es necesario tener timestamps (createdAt, updatedAt) si no los necesitas
});

module.exports = Jugador;
