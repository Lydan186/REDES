// /pages/api/authenticate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombreUsuario, contraseña } = req.body;

  if (!nombreUsuario || !contraseña) {
    return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
  }

  try {
    // Verificar si el usuario existe en la base de datos
    const user = await prisma.usuario.findFirst({
      where: {
        NombreUsuario: nombreUsuario,
        Contrase_a: contraseña, // ⚠️ Esto es inseguro. Considera usar hashing de contraseñas como bcrypt.
      },
    });

    if (user) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
}
