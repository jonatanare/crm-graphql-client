import Layout from '../components/Layout'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { getToken } from '../lib/sessionStorage'
import Link from 'next/link'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'

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

const ELIMINAR_CLIENTE = gql`
  mutation EliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`

export default function Home () {
  const router = useRouter()
  // Obtener clientes usuarios
  const [ eliminarCliente ] = useMutation( ELIMINAR_CLIENTE, {
    update(cache, { data: { eliminarCliente }}) {
      // Obtenemos el objeto de cache que deseamos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })

      // Reescribimos el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, eliminarCliente]
        }
      })
    }
  })

  const { data, error, loading } = useQuery(OBTENER_CLIENTES_USUARIO)

  if (loading) return 'Cargando...'

  if (!getToken()) {
    router.push('/login')
    return
  }


  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: '¿Deseas eliminar este cliente?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id
            }
          })
          if(data) {
            Swal.fire(
              'Eliminado!',
              `${data.eliminarCliente}`,
              'success'
            )
          }
        } catch (error) {
          toast.error(error.message)
        }
        
      }
    })
  }

  const editarCliente = (id) => {
    router.push({
      pathname: '/clientes/editar/[id]',
      query: {id}
    })
  }
  return (
    <Layout title='CRM - Administración de Clientes'>
      <Toaster />
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
            <td className='w-1/5 px-4 py-2'>Acciones</td>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data?.obtenerClientesVendedor.map(cliente => (
              <tr key={cliente.id}>
                <td className='border px-4 py-2'>{cliente.nombre} {cliente.apellido}</td>
                <td className='border px-4 py-2'>{cliente.empresa}</td>
                <td className='border px-4 py-2'>{cliente.email}</td>
                <td className='border px-4 py-2 flex'>
                  <button className='bg-red-500 flex items-center py-2 px-3 rounded shadow-md text-white text-sm font-bold' onClick={() => confirmarEliminarCliente(cliente.id)}>
                    Eliminar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>

                  <button
                    className='bg-green-500 flex items-center py-2 px-3 rounded shadow-md text-white text-sm font-bold ml-3' 
                    onClick={() => editarCliente(cliente.id)} >
                    Editar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Layout>
  )
}
