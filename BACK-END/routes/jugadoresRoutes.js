const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController'); // Asegúrate de que la ruta sea correcta

// Definir las rutas para jugadores
router.get('/', jugadoresController.obtenerJugadores); // Obtener todos los jugadores
router.get('/:id', jugadoresController.obtenerJugadorPorId); // Obtener un jugador por ID
router.post('/', jugadoresController.crearJugador); // Crear un jugador
router.put('/:id', jugadoresController.actualizarJugador); // Actualizar un jugador
router.delete('/:id', jugadoresController.eliminarJugador); // Eliminar un jugador

module.exports = router;
