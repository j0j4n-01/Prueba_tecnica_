//importar modelos 
const Juego = require('../models/juegos');
const Jugador = require('../models/jugador'); 

// Función para obtener todos los juegos
const obtenerJuegos = async () => {
    try {
        return await Juego.findAll();
    } catch (error) {
        console.error('Error en obtenerJuegos:', error.message);
        throw new Error('Error al obtener los juegos');
    }
};

// Función obtener juego por ID
const obtenerJuegoPorId = async (id) => {
    try {
        return await Juego.findByPk(id);
    } catch (error) {
        throw new Error('Error al obtener el juego');
    }
};

// Función para crear un juego
// const crearJuego = async (estado, ganador_id) => {
//     try {
//         return await Juegos.create({ estado, ganador_id });
//     } catch (error) {
//         throw new Error('Error al crear el juego');
//     }
// };

const crearJuego = async (estado, ganadorId) => {
    const transaction = await Juego.sequelize.transaction(); // Usamos una transacción para asegurar la integridad de los datos
    try {
        if (estado !== true) {
            throw new Error('No se puede crear un juego con estado false');
        }

        // Crear el juego
        const nuevoJuego = await Juego.create({ estado, ganador_id: ganadorId }, { transaction });

        // Si hay un ganador, actualizamos juegos_win
        if (ganadorId) {
            const jugador = await Jugador.findByPk(ganadorId, { transaction });
            if (jugador) {
                jugador.juegos_win += 1; // Incrementamos el contador de juegos ganados
                await jugador.save({ transaction });
            } else {
                throw new Error('El jugador ganador no existe');
            }
        }

        await transaction.commit(); // Confirmamos los cambios
        return nuevoJuego;
    } catch (error) {
        await transaction.rollback(); // Revertimos los cambios si hay un error
        throw new Error('Error al crear el juego: ' + error.message);
    }
};





// Función para actualizar un juego
const actualizarJuego = async (id, estado, ganador_id) => {
    try {
        const juego = await Juego.findByPk(id);
        if (!juego) {
            throw new Error('Juego no encontrado');
        }
        juego.estado = estado;
        juego.ganador_id = ganador_id;
        await juego.save();
        return juego;
    } catch (error) {
        throw new Error('Error al actualizar el juego');
    }
};

// Función para eliminar un juego
const eliminarJuego = async (id) => {
    try {
        const juego = await Juego.findByPk(id);
        if (!juego) {
            throw new Error('Juego no encontrado');
        }
        await juego.destroy();
        return juego;
    } catch (error) {
        throw new Error('Error al eliminar el juego');
    }
};

module.exports = {
    obtenerJuegos,
    obtenerJuegoPorId,
    crearJuego,
    actualizarJuego,
    eliminarJuego
};
