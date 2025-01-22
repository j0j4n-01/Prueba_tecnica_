const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Juego extends Model {}

Juego.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    finished_at: {
        type: DataTypes.DATE
    },
    ganador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Jugadores',
            key: 'id'
        },
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Juego',
    tableName: 'Juegos',
    timestamps: false 
});

module.exports = Juego;
