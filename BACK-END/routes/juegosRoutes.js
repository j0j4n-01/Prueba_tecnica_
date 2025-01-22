const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegosController'); // Asegúrate de que la ruta sea correcta

// Definir las rutas para juegos
router.get('/', juegosController.obtenerJuegos); // Obtener todos los juegos
router.get('/:id', juegosController.obtenerJuegoPorId); // Obtener un juego por ID
router.post('/', juegosController.crearJuego); // Crear un juego
router.put('/:id', juegosController.actualizarJuego); // Actualizar un juego
router.delete('/:id', juegosController.eliminarJuego); // Eliminar un juego

module.exports = router;
