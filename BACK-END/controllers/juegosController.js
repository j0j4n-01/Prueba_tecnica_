const juegosService = require('../services/juegosService');

// Obtener todos los juegos
const obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juegosService.obtenerJuegos();
        res.json(juegos);
    } catch (error) {
        console.error('Error en el controlador de juegos:', error.message); // Registra el error en consola
        res.status(500).json({ message: error.message });
    }
};

// Obtener un juego por ID
const obtenerJuegoPorId = async (req, res) => {
    try {
        const juego = await juegosService.obtenerJuegoPorId(req.params.id);
        if (juego) {
            res.json(juego);
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo juego
const crearJuego = async (req, res) => {
    try {
        const { estado, ganador_id } = req.body;

        if (estado !== true) {
            return res.status(400).json({ message: 'El estado inicial del juego debe ser true' });
        }
        
        const juego = await juegosService.crearJuego(estado, ganador_id);
        res.status(201).json(juego);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un juego
const actualizarJuego = async (req, res) => {
    try {
        const { estado, ganador_id } = req.body;
        const juego = await juegosService.actualizarJuego(req.params.id, estado, ganador_id);
        if (juego) {
            res.json(juego);
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un juego
const eliminarJuego = async (req, res) => {
    try {
        const juego = await juegosService.eliminarJuego(req.params.id);
        if (juego) {
            res.json({ message: 'Juego eliminado' });
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerJuegos,
    obtenerJuegoPorId,
    crearJuego,
    actualizarJuego,
    eliminarJuego
};
