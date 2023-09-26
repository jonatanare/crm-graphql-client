import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { getToken } from '../lib/sessionStorage'
import Link from 'next/link'

const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`

export default function Home () {
  const router = useRouter()
  // Obtener clientes usuarios
  const { data, error, loading } = useQuery(OBTENER_CLIENTES_USUARIO)

  if (loading) return 'Cargando...'

  if (!getToken()) {
    router.push('/login')
    return
  }
  return (
    <Layout title='CRM - Administración de Clientes'>
      <h1 className='text-2xl text-gray-800 font-light'>Clientes</h1>
      <Link href='/clientes/nuevo' className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800'>
        Nuevo Cliente
      </Link>
      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <td className='w-1/5 px-4 py-2'>Nombre</td>
            <td className='w-1/5 px-4 py-2'>Empresa</td>
            <td className='w-1/5 px-4 py-2'>Email</td>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data?.obtenerClientesVendedor.map(cliente => (
              <tr key={cliente.id}>
                <td className='border px-4 py-2'>{cliente.nombre}</td>
                <td className='border px-4 py-2'>{cliente.empresa}</td>
                <td className='border px-4 py-2'>{cliente.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Layout>
  )
}
