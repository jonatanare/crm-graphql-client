import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Login () {
  return (
    <Layout title='Iniciar Sesión'>
      <h1 className='text-center text-2xl text-white font-light'>Iniciar sesión</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input type='email' id='email' placeholder='Email usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input type='password' id='password' placeholder='Password usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>

            <button className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700 rounded-md'>Iniciar Sesión</button>
            <div className='mt-2 text-center'>
              <p>¿Aun no tienes cuenta? | <Link href='/registro' className='text-sm font-bold text-blue-700'>Crear cuenta</Link></p>
            </div>
          </form>
        </div>

      </div>
    </Layout>
  )
}
