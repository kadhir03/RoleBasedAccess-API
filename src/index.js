// index.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
require('dotenv').config();  // Cargar variables de entorno

const { sequelize } = require('./database/connection');
const syncModels = require('./database/index.models');

// Importar rutas
const taskRoutes = require('../src/tasks/taskRoutes');
const userRoutes = require('../src/users/userRoutes');
const roleRoutes = require('../src/roles/roleRoutes');
const protectedRoutes = require('./protected/protectedRoutes.js')
const authRoutes = require('../src/auth/authRoutes');

// Configuración de Swagger
const { swaggerUi, swaggerSpec } = require('../src/swaggerConfig'); 

const app = express();
const PORT = process.env.PORT || 4000;  // Usar un puerto predeterminado si no está definido en .env

// Middlewares
app.use(logger('dev'));  // Logger para desarrollo
app.use(express.json());  // Analizar JSON automáticamente en las peticiones
app.use(express.urlencoded({ extended: true }));  // Analizar URL-encoded datos
app.use(cookieParser());  // Parsear cookies
app.use(cors({
    origin: '*',  // Permitir todas las conexiones CORS
}));

// Rutas de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de rutas

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);



// Manejo de errores 404
app.use((req, res, next) => {
    next(createError(404));
});

// Manejo de otros errores
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


// Llamada a la función para sincronizar modelos
syncModels(sequelize);
//sequelize.sync({ force: true })   //ese codigo borra la base de datos y crea una nueva
// Sincroniza el modelo con la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database and tables synced!');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
