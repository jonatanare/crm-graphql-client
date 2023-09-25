import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Registro () {
  // Validación de formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio').min(8, 'El password debe ser de al menos 8 caracteres')
    }),
    onSubmit: valores => {
      console.log('Enviando...')
      console.log(valores)
    }
  })
  return (
    <Layout title='Crear cuenta'>
      <h1 className='text-center text-2xl text-white font-light'>Registro</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nombre' className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
              <input type='text' id='nombre' placeholder='Nombre usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                            formik.touched.nombre && formik.errors.nombre && (
                              <small className='text-red-500'>{formik.errors.nombre}</small>
                            )
                        }
            </div>
            <div className='mb-4'>
              <label htmlFor='apellido' className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
              <input type='text' id='apellido' placeholder='Apellido usuario' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                            formik.touched.apellido && formik.errors.apellido && (
                              <small className='text-red-500'>{formik.errors.apellido}</small>
                            )
                        }
            </div>
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

            <button className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700 rounded-md'>Crear cuenta</button>
            <div className='mt-2 text-center'>
              <p>¿Ya tienes cuenta? | <Link href='/login' className='text-sm font-bold text-blue-700'>Iniciar sesión</Link></p>
            </div>
          </form>
        </div>

      </div>
    </Layout>
  )
}
