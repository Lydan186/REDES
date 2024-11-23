import Form from '@/app/ui/dashboard/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchUsuarios, fetchUsuariosById } from '@/app/lib/data';
 
export default async function Page(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const [users] = await Promise.all([
        fetchUsuariosById(id),
        fetchUsuarios(),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'usuario', href: '/dashboard/' },
          {
            label: 'Edit usuario',
            href: `/dashboard/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form user={users}/>
    </main>
  );
}