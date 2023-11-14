const http = require('http');
const app = require('./app');
const sequelize = require('./config/config'); // Importa la configuración de Sequelize

const port = process.env.PORT || 3000;

// Sincroniza Sequelize con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    
    // Crea el servidor HTTP una vez que la base de datos esté sincronizada
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
