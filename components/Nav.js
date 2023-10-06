import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { deleteToken, getToken } from '../lib/sessionStorage'

const OBTENER_USUARIO = gql`
    query ObtenerUsuario {
        obtenerUsuario {
        id
        nombre
        apellido
        email
        }
    }
`

export default function Nav () {
  const router = useRouter()
  // Obtener usuario
  const { data, error, loading } = useQuery(OBTENER_USUARIO)

  if (loading) return null

  if (!getToken()) {
    router.push('/login')
    return
  }

  const cerrarSession = () => {
    deleteToken()
    router.push('/login')
  }
  return (
    <>
      <div className='flex justify-end mb-6'>
        {
                !loading
                  ? (
                    <p className='mr-2 p-1'>Hola: <strong>{data?.obtenerUsuario?.nombre}</strong></p>
                    )
                  : (
                    <div className='animate-pulse flex space-x-4'>
                      <div class='h-2 bg-slate-700 rounded' />
                    </div>
                    )
            }
        <button type='button' className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded-md py-1 px-2 text-white shadow' onClick={() => cerrarSession()}>Cerrar Sesión</button>
      </div>
    </>
  )
}
