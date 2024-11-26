'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { lusitana } from '@/app/ui/fonts';
import { KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const nombreUsuario = formData.get("NombreUsuario") as string;
    const contraseña = formData.get("Contraseña") as string;

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify({ nombreUsuario, contraseña }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message || 'Error en el inicio de sesión');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Error de red. Intente nuevamente.');
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>
          Por favor, inicie sesión para continuar.
        </h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="NombreUsuario">
              Nombre de Usuario
            </label>
            <div className="relative">
              <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" id="NombreUsuario" type="text" name="NombreUsuario" placeholder="Ingrese su nombre de usuario" required />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="Contraseña">
              Contraseña
            </label>
            <div className="relative">
              <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" id="Contraseña" type="password" name="Contraseña" placeholder="Ingrese su contraseña" required minLength={4} />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Iniciar Sesión <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        {errorMessage && (
          <div className="mt-3 flex items-center text-red-600">
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
}
