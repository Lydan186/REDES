const sql = require('mssql');
const config = require('../config/sqlServerConfig');

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conexión a la base de datos exitosa');
  } catch (err) {
    console.error('Error de conexión a la base de datos', err);
  }
}

module.exports = { connectToDatabase, sql }