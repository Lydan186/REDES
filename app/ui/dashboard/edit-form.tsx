'use client';

import { UserField } from '@/app/lib/definitions';
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { updateUsuario, UserState } from '@/app/lib/actions';

export default function EditUserForm({
  user,
}: {
  user: UserField;
}) {

  const initialState: UserState = { message: "", errors: {} };
  const updateUserWithId = updateUsuario.bind(null, user.UsuarioID);
  const [UserState, formAction] = useActionState(updateUserWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre de Usuario */}
        <div className="mb-4">
          <label htmlFor="nombreUsuario" className="mb-2 block text-sm font-medium">
            Nombre de Usuario
          </label>
          <div className="relative">
            <input
              id="NombreUsuario"
              name="NombreUsuario"
              type="text"
              defaultValue={user.NombreUsuario}
              placeholder="Introduce el nombre de usuario"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label htmlFor="contraseña" className="mb-2 block text-sm font-medium">
            Contraseña
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="Contraseña"
                name="Contraseña"
                type="password"
                // defaultValue={user.Contraseña}
                placeholder="Introduce la contraseña"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Usuario</Button>
      </div>
    </form>
  );
}
