import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home () {
  return (
    <Layout title='CRM - Administración de Clientes'>
      <h1 className='text-2xl text-gray-800 font-light'>Clientes</h1>
    </Layout>
  )
}
