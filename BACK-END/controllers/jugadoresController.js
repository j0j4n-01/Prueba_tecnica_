const jugadoresService = require('../services/jugadoresService'); // Importa el servicio

// Obtener todos los jugadores
const obtenerJugadores = async (req, res) => {
    try {
        const jugadores = await jugadoresService.obtenerJugadores();
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un jugador por ID
const obtenerJugadorPorId = async (req, res) => {
    try {
        const jugador = await jugadoresService.obtenerJugadorPorId(req.params.id);
        if (jugador) {
            res.json(jugador);
        } else {
            res.status(404).json({ message: 'Jugador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un jugador
const crearJugador = async (req, res) => {
    try {
        const { nombre } = req.body; // Asumiendo que solo pasamos el nombre
        const jugador = await jugadoresService.crearJugador(nombre);
        res.status(201).json(jugador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un jugador
const actualizarJugador = async (req, res) => {
    try {
        const { nombre } = req.body;
        const jugador = await jugadoresService.actualizarJugador(req.params.id, nombre);
        if (jugador) {
            res.json(jugador);
        } else {
            res.status(404).json({ message: 'Jugador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un jugador
const eliminarJugador = async (req, res) => {
    try {
        const jugador = await jugadoresService.eliminarJugador(req.params.id);
        if (jugador) {
            res.json({ message: 'Jugador eliminado' });
        } else {
            res.status(404).json({ message: 'Jugador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerJugadores,
    obtenerJugadorPorId,
    crearJugador,
    actualizarJugador,
    eliminarJugador
};
