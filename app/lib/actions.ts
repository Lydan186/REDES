'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

interface UserData {
  NombreUsuario: string;
  Contraseña: string;
}

export type UserState = {
  errors?: {
    NombreUsuario?: string[];
    Contrasena?: string[];
  };
  message?: string;
};

function validateUserData(data: UserData) {
  const errors: { [key: string]: string[] } = {};
  if (!data.NombreUsuario || data.NombreUsuario.trim() === '') {
    errors.NombreUsuario = ['El campo NombreUsuario es obligatorio.'];
  }
  if (!data.Contraseña || data.Contraseña.trim() === '') {
    errors.Contraseña = ['El campo Contraseña es obligatorio.'];
  }

  return { isValid: Object.keys(errors).length === 0, data, errors };
}

export async function createUsuario(prevState: UserState, formData: FormData) {
  const NombreUsuario = formData.get('NombreUsuario')?.toString() || '';
  const Contraseña = formData.get('Contraseña')?.toString() || '';
  const { isValid, errors } = validateUserData({ NombreUsuario, Contraseña });

  if (!isValid) {
    return {
      errors,
      message: 'Faltan campos obligatorios. No se pudo crear el usuario.',
    };
  }

  try {
    await prisma.usuario.create({
      data: {
        NombreUsuario:NombreUsuario,
        Contrase_a:Contraseña,
      },
    });
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
    return { message: 'Usuario creado exitosamente' };
  } catch (error) {
    console.error('Database Error (Insert Usuario):', error);
    return { message: 'Error de base de datos: No se pudo crear el usuario.' };
  }
}

export async function updateUsuario(
  UsuarioID: number,
  prevState: UserState,
  formData: FormData
) {
  const NombreUsuario = formData.get('NombreUsuario')?.toString() || '';
  const Contraseña = formData.get('Contraseña')?.toString() || '';
  const { isValid, errors } = validateUserData({ NombreUsuario, Contraseña });

  if (!isValid) {
    return {
      errors,
      message: 'Faltan campos obligatorios. No se pudo actualizar el usuario.',
    };
  }

  try {
    await prisma.usuario.update({
      where: { UsuarioID },
      data: {
        NombreUsuario:NombreUsuario,
        Contrase_a:Contraseña,
      },
    });
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
    return { message: 'Usuario actualizado exitosamente' };
  } catch (error) {
    console.error('Database Error (Update Usuario):', error);
    return { message: 'Error de base de datos: No se pudo actualizar el usuario.' };
  }
}

export async function deleteUsuario(UsuarioID: number) {
  try {
    await prisma.usuario.delete({
      where: { UsuarioID },
    });
    revalidatePath('/dashboard/');
    redirect('/dashboard/');
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    console.error('Database Error (Delete Usuario):', error);
    return { message: 'Error de base de datos: No se pudo eliminar el usuario.' };
  }
}
