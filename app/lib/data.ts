const sql = require('mssql');
import { formatCurrency } from './utils';
import { UserField, User } from './definitions';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig(); // Esto carga las variables de entorno desde el archivo .env

const sqlConfig = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  server: process.env.SQLSERVER_HOST,
  database: process.env.SQLSERVER_DATABASE,
  // port:1433,
  options: {
    encrypt: process.env.SQLSERVER_ENCRYPT === 'true',
    trustServerCertificate: process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE === 'true'
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(sqlConfig);
    console.log('Conexión a la base de datos exitosa');
  } catch (err) {
    console.error('Error de conexión a la base de datos', err);
  }
}


export async function fetchUsuarios() {
    try {
        await connectToDatabase();
        let result = await sql.query('SELECT UsuarioID, NombreUsuario, Contraseña, FechaRegistro FROM Usuario');
        return result.recordset;
    } catch (error) {
        console.error('Database Error (Fetch Usuarios):', error);
        throw new Error('Failed to fetch data from the Usuario table.');
    }
}

export async function fetchUsuariosById(id: number) {
    try {
        await connectToDatabase();
        let result = await sql.query`
            SELECT
                UsuarioID,
                NombreUsuario,
                Contraseña,
                FechaRegistro
            FROM Usuario
            WHERE UsuarioID = ${id};
        `;
        return result.recordset[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

// export async function authenticate(nombreUsuario: string, contraseña: string) {
//   try {
//     await sql.connect(sqlConfig);
//     const result = await sql.query`
//       SELECT * FROM Usuario
//       WHERE NombreUsuario = ${nombreUsuario} AND Contraseña = ${contraseña}
//     `;

//     if (result.recordset.length > 0) {
//       return { message: 'Inicio de sesión exitoso' };
//     } else {
//       return { error: 'Nombre de usuario o contraseña incorrectos' };
//     }
//   } catch (error) {
//     console.error('Database Error:', error);
//     return { error: 'Error en el servidor' };
//   }
// }
