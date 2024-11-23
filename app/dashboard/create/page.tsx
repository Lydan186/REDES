import Form from '@/app/ui/dashboard/create-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchUsuarios } from '@/app/lib/data';
 
export default async function Page() {
  const user = await fetchUsuarios();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Usuarios', href: '/dashboard/' },
          {
            label: 'Crear usuario',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form user={user} />
    </main>
  );
}