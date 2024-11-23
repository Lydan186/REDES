import { UpdateUser, DeleteUser } from '@/app/ui/dashboard/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { User } from '@/app/lib/definitions';

export default function Table({ users }: { users: User[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.UsuarioID}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">{user.NombreUsuario}</p>
                    <p className="text-sm text-gray-500">{user.Contraseña}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(user.FechaRegistro)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-sm font-medium">ID: {user.UsuarioID}</p>
                  <div className="flex justify-end gap-2">
                    <UpdateUser id={user.UsuarioID} />
                    <DeleteUser id={user.UsuarioID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  UsuarioID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  NombreUsuario
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contraseña
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  FechaRegistro
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.map((user) => (
                <tr
                  key={user.UsuarioID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {user.UsuarioID}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.NombreUsuario}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.Contraseña}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(user.FechaRegistro)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser id={user.UsuarioID} />
                      <DeleteUser id={user.UsuarioID} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
