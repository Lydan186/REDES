// const sql = require('mssql');

// // const config = {
// //     user: process.env.SQLSERVER_USER,
// //     password: process.env.SQLSERVER_PASSWORD,
// //     server: process.env.SQLSERVER_HOST,
// //     database: process.env.SQLSERVER_DATABASE,
// //     options: {
// //         encrypt: process.env.SQLSERVER_ENCRYPT === 'true',  // Convierte el valor de string a boolean
// //         trustServerCertificate: process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE === 'true'
// //     }
// // };


// (async function testConnection() {
//     try {
//         await sql.connect({
//             user: 'sqluser',
//             password: '1234',
//             server: 'DILAN',
//             database: 'REDES',
//             options: {
//                 encrypt: true,
//                 trustServerCertificate: true
//             }
//         });
//         console.log('Conexión exitosa');
//     } catch (err) {
//         console.error('Error de conexión', err);
//     }
// })();

// module.exports = config;


config();


async function sqlConfig() {
    try {
        await sql.connect({
            user: 'sqluser',
            password: '1234',
            server: 'DILAN',
            database: 'REDES',
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        });
        console.log('Conexión exitosa');
    } catch (err) {
        console.error('Error de conexión', err);
    }
}


export default sqlConfig;