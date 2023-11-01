import React from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!) {
        obtenerCliente(id: $id) {
        id
        nombre
        apellido
        email
        telefono
        empresa
        vendedor
        }
    }  
`

const EditarCliente = () => {
    // obtener el ID actual
    const router = useRouter()
    const { id } = router.query
    console.log(id);

    // Consultar para obtener el cliente
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    })

    if (loading) return 'Cargando...'

    console.log('data:__', data?.obtenerCliente);
    return (
        <Layout title={'Editar Cliente'}>
            <h1 className='text-2xl text-gray-800 font-light'>Editar cliente</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik

                    >
                        {
                            props => {
                                console.log(props)
                                return (
                                    <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    //   onSubmit={formik.handleSubmit}
                                    >
                                        <div className='mb-4'>
                                            <label htmlFor='nombre' className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                                            <input type='text' name='nombre' id='nombre' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                            //   value={formik.values.nombre} 
                                            //   onChange={formik.handleChange} 
                                            //   onBlur={formik.handleBlur} 
                                            />
                                            {/* {
                formik.touched.nombre && formik.errors.nombre && (
                  <small className='text-red-500'>{formik.errors.nombre}</small>
                )
              } */}
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor='apellido' className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
                                            <input type='text' name='apellido' id='apellido' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                            //   value={formik.values.apellido} 
                                            //   onChange={formik.handleChange} 
                                            //   onBlur={formik.handleBlur} 
                                            />
                                            {/* {
                formik.touched.apellido && formik.errors.apellido && (
                  <small className='text-red-500'>{formik.errors.apellido}</small>
                )
              } */}
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                                            <input type='email' name='email' id='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                            //   value={formik.values.email} 
                                            //   onChange={formik.handleChange} 
                                            //   onBlur={formik.handleBlur} 
                                            />
                                            {/* {
                formik.touched.email && formik.errors.email && (
                  <small className="text-red-500">{formik.errors.email}</small>
                )
              } */}
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor='empresa' className='block text-gray-700 text-sm font-bold mb-2'>Empresa</label>
                                            <input type='text' name='empresa' id='empresa' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                            //   value={formik.values.empresa} 
                                            //   onChange={formik.handleChange} 
                                            //   onBlur={formik.handleBlur}
                                            />
                                            {/* {
                formik.touched.empresa && formik.errors.empresa && (
                  <small className="text-red-500">{formik.errors.empresa}</small>
                )
              } */}
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor='telefono' className='block text-gray-700 text-sm font-bold mb-2'>Teléfono</label>
                                            <input type='tel' name='telefono' id='telefono' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
                                            //   value={formik.values.telefono} 
                                            //   onChange={formik.handleChange} 
                                            //   onBlur={formik.handleBlur} 
                                            />
                                            {/* {
                formik.touched.telefono && formik.errors.telefono && (
                  <small className="text-red-500">{formik.errors.telefono}</small>
                )
              } */}
                                        </div>

                                        <button className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700 rounded-md'>Registrar cliente</button>
                                    </form>
                                )
                            }
                        }
                    </Formik>

                </div>
            </div>
        </Layout>
    )
}

export default EditarCliente