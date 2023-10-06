import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Sidebar () {
  const router = useRouter()
  return (
    <>
      <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
        <div>
          <p className='text-white text-2xl font-black'>CRM Clientes</p>
        </div>

        <nav className='mt-5 list-none'>
          <ul>
            <li className={`mb-3 ${router.pathname === '/' ? 'bg-blue-900    p-3 rounded-md' : 'p-3'}`}>
              <Link className='text-white block' href='/'>
                Clientes
              </Link>
            </li>
            <li className={`mb-3 ${router.pathname === '/pedidos' ? 'bg-blue-900     p-3 rounded-md' : 'p-3'}`}>
              <Link className='text-white block' href='/pedidos'>
                Pedidos
              </Link>
            </li>
            <li className={`mb-3 ${router.pathname === '/productos' ? 'bg-blue-900   p-3 rounded-md' : 'p-3'}`}>
              <Link className='text-white block' href='/productos'>
                Productos
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
