import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    
    const {id} = useParams();

    useEffect( () => {
        const obtenerClienteAPI = async () => {
            
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const repuesta = await fetch(url)
                const resultado = await repuesta.json()
                setCliente(resultado)
            } catch(error) {
                console.log(error)
            }
            setTimeout( () => {
                setCargando(!cargando)
            }, 1000)
        }
        obtenerClienteAPI()
    }, [])

    return (
        <div>
            
            {cargando ? <Spinner /> : (
                
                  Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
                    <>
                        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                        <p className="mt-3">Informacion del cliente</p>
            
                        <p className="text-3xl text-gray-600 mt-10">
                            <span className="uppercase text-gray-800 font-bold">Cliente:</span>
                            {cliente.nombre}
                        </p>
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="uppercase text-gray-800 font-bold">Email:</span>
                            {cliente.email}
                        </p>
                        {cliente.telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase text-gray-800 font-bold">Telefono:</span>
                                {cliente.telefono}
                            </p>
                        )}
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="uppercase text-gray-800 font-bold">Empresa:</span>
                            {cliente.empresa}
                        </p>
                        {cliente.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase text-gray-800 font-bold">Notas:</span>
                                {cliente.notas}
                            </p>
                        )}
                    </>
                ) 
            )}
            
        </div>
    )
}

export default VerCliente
