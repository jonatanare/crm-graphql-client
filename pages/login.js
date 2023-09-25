import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { setToken } from '../lib/sessionStorage'

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`

export default function Login () {
    const router = useRouter()

    // Mutation autenticar usuario
    const [ loginUsuario ] = useMutation(AUTENTICAR_USUARIO)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email no es válido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio')
        }),
        onSubmit: async (valores) => {
            const { email, password} = valores
            try {
                const { data } = await loginUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })

                console.log(data);

                if(data) {
                    toast.success('Usuario autenticado')
                    setToken(data?.autenticarUsuario?.token)
                    formik.resetForm()
                    setTimeout(() => {
                        router.push('/')
                    }, 3000);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    })
  return (
    <Layout title='Iniciar Sesión'>
      <h1 className='text-center text-2xl text-white font-light'>Iniciar sesión</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input type='email' id='email' placeholder='Email usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.email && formik.errors.email && (
                    <small className='text-red-500'>{formik.errors.email}</small>
                )
                }
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input type='password' id='password' placeholder='Password usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.password && formik.errors.password && (
                    <small className='text-red-500'>{formik.errors.password}</small>
                )
                }
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
