const Jugador = require('../models/jugador'); // Asegúrate de que la ruta sea correcta

// Obtener todos los jugadores
const obtenerJugadores = async () => {
    try {
        return await Jugador.findAll();
    } catch (error) {
        throw new Error('Error al obtener los jugadores');
    }
};

// Obtener un jugador por ID
const obtenerJugadorPorId = async (id) => {
    try {
        return await Jugador.findByPk(id);
    } catch (error) {
        throw new Error('Error al obtener el jugador');
    }
};

// Crear un jugador
const crearJugador = async (nombre) => {
    try {
        return await Jugador.create({ nombre });
    } catch (error) {
        throw new Error('Error al crear el jugador');
    }
};

// Actualizar un jugador
const actualizarJugador = async (id, nombre) => {
    try {
        const jugador = await Jugador.findByPk(id);
        if (jugador) {
            jugador.nombre = nombre;
            await jugador.save();
            return jugador;
        } else {
            throw new Error('Jugador no encontrado');
        }
    } catch (error) {
        throw new Error('Error al actualizar el jugador');
    }
};

// Eliminar un jugador
const eliminarJugador = async (id) => {
    try {
        const jugador = await Jugador.findByPk(id);
        if (jugador) {
            await jugador.destroy();
            return jugador;
        } else {
            throw new Error('Jugador no encontrado');
        }
    } catch (error) {
        throw new Error('Error al eliminar el jugador');
    }
};

module.exports = {
    obtenerJugadores,
    obtenerJugadorPorId,
    crearJugador,
    actualizarJugador,
    eliminarJugador
};
