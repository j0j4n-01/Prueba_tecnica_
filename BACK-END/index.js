const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/database');
const jugadoresRoutes = require('./routes/jugadoresRoutes'); // Importa las rutas de jugadores
const juegosRoutes = require('./routes/juegosRoutes'); // Importa las rutas de jugadores

app.use(cors());
app.use(express.json()); // Para poder manejar solicitudes JSON

// Usa las rutas de jugadores
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/juegos', juegosRoutes);

// Conexión con la base de datos y arranque del servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
