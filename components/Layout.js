import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'
import Nav from './Nav'

export default function Layout ({ children, title }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>
      <Script src='https://cdn.tailwindcss.com' />
      {
            router.pathname === '/login' || router.pathname === '/registro'
              ? (
                <div className='bg-gray-800 min-h-screen'>
                  {children}
                </div>
                )
              : (
                <div className='bg-gray-200 min-h-screen'>
                  <div className='flex min-h-screen'>
                    <Sidebar />
                    <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                      <Nav />
                      {children}
                    </main>
                  </div>
                </div>
                )
        }
    </>
  )
}
