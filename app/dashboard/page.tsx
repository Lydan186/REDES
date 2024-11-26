import Table from '@/app/ui/dashboard/table';
import { CreateUser } from '@/app/ui/dashboard/buttons';
// import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { UsersTableSkeleton } from '@/app/ui/skeletons';
import { fetchUsuarios } from '@/app/lib/data'; // Asegúrate de importar fetchUsuarios correctamente

export default async function Page({
  
}: {

}) {

  // Obtener usuarios de la base de datos
  const users = await fetchUsuarios();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Usuarios</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateUser />
      </div>
      <Table users={users} />
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
  );
}
