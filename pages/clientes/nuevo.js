import React from 'react'
import Layout from '../../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'


const NUEVO_CLIENTE = gql`
    mutation NuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
        id
        nombre
        apellido
        email
        telefono
        }
    }
`

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

export default function Nuevo () {
    const router = useRouter()

    // Muation para crear nuevo cliente
    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
      update(cache, { data: { nuevoCliente }}) {
        // Obtener el objeto de cahce que deseamos actualziar

        const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO})

        // Reescribimos el cache ( El cache nunca se debe modificar )
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
          }
        })
      }
    })
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            empresa: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('el email no es válido').required('El email es obligatorio'),
            telefono: Yup.string().required('el teléfono es obligatorio'),
            empresa: Yup.string().required('La empresa es obligatoria')
        }),
        onSubmit: async valores => {
          const { nombre, apellido, email, telefono, empresa } = valores
            try {

              const { data, error } = await nuevoCliente({
                variables: {
                  input: {
                    nombre,
                    apellido,
                    email,
                    telefono,
                    empresa
                  }
                }
              })

              if(data) {
                toast.success(`El cliente ${nombre} se registro correctamente`)
                formik.resetForm()
                router.push('/')
              }
                
            } catch (error) {
              toast.error(error.message)
            }
        }
    })
  return (
    <Layout>
      <Toaster />
      <h1 className='text-2xl text-gray-800 font-light'>Nuevo cliente</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='nombre' className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
              <input type='text' name='nombre' id='nombre' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.nombre && formik.errors.nombre && (
                  <small className='text-red-500'>{formik.errors.nombre}</small>
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor='apellido' className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
              <input type='text' name='apellido' id='apellido' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.apellido && formik.errors.apellido && (
                  <small className='text-red-500'>{formik.errors.apellido}</small>
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input type='email' name='email' id='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.email && formik.errors.email && (
                  <small className="text-red-500">{formik.errors.email}</small>
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor='empresa' className='block text-gray-700 text-sm font-bold mb-2'>Empresa</label>
              <input type='text' name='empresa' id='empresa' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={formik.values.empresa} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.empresa && formik.errors.empresa && (
                  <small className="text-red-500">{formik.errors.empresa}</small>
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor='telefono' className='block text-gray-700 text-sm font-bold mb-2'>Teléfono</label>
              <input type='tel' name='telefono' id='telefono' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={formik.values.telefono} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.telefono && formik.errors.telefono && (
                  <small className="text-red-500">{formik.errors.telefono}</small>
                )
              }
            </div>

            <button className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700 rounded-md'>Registrar cliente</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
