import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function pedidos () {
  return (
    <Layout title='Pedidos'>
      <h1 className='text-2xl text-gray-800 font-light'>Pedidos</h1>
      <Link href='/pedidos/nuevo' className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800'>
        Nuevo Pedido
      </Link>
    </Layout>
  )
}
