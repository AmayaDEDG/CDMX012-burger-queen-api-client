import { useState, useEffect } from 'react';
import { onSnapshot, collection} from 'firebase/firestore';
import React from 'react';
import { db } from '../../lib/firebaseConfig';
import './associate.css'
import { useNavigate } from "react-router-dom";


export const Associate = () =>{

        const navigate = useNavigate();

        const [ listaDeAsociados, colocarListaDeAsociados] = useState([]);
        
        const colocarAsociados = async () => {

            const coleccionRef = collection( db, 'empleados');

        onSnapshot(coleccionRef, (querySnapshot) => {
                const asociados = []
                querySnapshot.forEach(doc =>{
                    asociados.push({ ...doc.data(), id: doc.id})
                })
                colocarListaDeAsociados(asociados)
            
            })
        }
        useEffect(()=> {
            colocarAsociados()
        },[])
        return(
            <>
            {listaDeAsociados.map((asociados) => (
                <div id='tarjetaAso' key={asociados.id}>
                <div id='listName'><h5>{asociados.name}</h5></div>
                <div id='listJob'>
                    <h5>{asociados.job}
                        <button className='details'onClick= {() => navigate(`/EditDeletAsso/${asociados.id}`)}>Ver detalles</button>
                    </h5>
                </div>
                </div>
            ))}
            </>
        )

}
