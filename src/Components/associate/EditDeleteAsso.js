import icoBurgerQueen from '../images/icoBurgerQueen.svg';
import back from '../images/back.svg';
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';
import { getAuth } from "firebase/auth";


export const EditDeleteAsso = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  const partners = () => {
    navigate('/AddPartners')
  }
  /*-------------------TERMINA NAVEGACION--------------*/

  /*-------------------JALAR DATOS A EDITAR----------------*/

  const inicio = {
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    date: '',
    contEmergency: '',
    contract: '',
    time: '',
    job: ''
  }
  const [valor, actualizarValor] = useState(inicio);


  const documentos = async (id) => {
    const docRef = doc(db, 'empleados', id);
    const docSnap = await getDoc(docRef);
    actualizarValor(docSnap.data());
  }
  useEffect(() => {
    documentos(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /*-------------------------FUNCION FIRESTORE EDITAR---------------------*/

  const EditarUnAsociado = async (id) => {

    const coleccionDeReferencia = doc(db, 'empleados', id);
    await updateDoc((coleccionDeReferencia), valor)
    navigate('/AddPartners')
  }

  /*--------------FUNCION DE ELIMINAR ASOCIADO-----------------*/
  const eliminar = () => {

    Swal.fire({
      text: '¿Estás seguro de darlo de baja?',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      backdrop: ` rgba(0, 0, 0, 0.70)`,

    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Ya elimine')
        await deleteDoc(doc(db, 'empleados', id))
        navigate('/AddPartners')
      }
    })

  }

  return (

    <section className='RecordAsso'>
      <div className='header'>
        <img src={icoBurgerQueen} alt='Burger Queen' id='icoBurgerQueen' />
        <button id='back' onClick={partners}><img src={back} alt='Volver' id='backImg' /></button>
      </div>
      <h3>Asociado</h3>
      <button onClick={eliminar} id='baja'>Dar de baja</button>
      <section className='form'>
        <label className='labelName'>Nombre</label>
        <input
          type='text' id='name'
          placeholder='Ej. Amaya De Esesarte'
          value={valor.name}
          onChange={(event) => { actualizarValor({ ...valor, name: event.target.value }) }}
        />
        <label className='labelEmail'>Correo</label>
        <input
          type='e-mail'
          id='email'
          placeholder='Ej. amaya@burgerqueen.com'
          value={valor.email}
        />
        <label className='labelPassword'>Contraseña</label>
        <input
          type='text'
          id='password'
          placeholder='Ej. ama1234'
          value={valor.password}
        />
        <select id='job' onChange={(event) => {
          actualizarValor({ ...valor, job: event.target.value })
        }} >
          <option value={valor.job}>{valor.job}</option>
          <option value="Jefe de Cocina">Gerente</option>
          <option value="Cocinero">Cocinero</option>
          <option value="Mesero">Mesero</option>
        </select>

        <label className='labelAge'>Edad</label>
        <input
          type='text'
          id='Age'
          placeholder='Ej. 24 años'
          value={valor.age}
          onChange={(event) => { actualizarValor({ ...valor, age: event.target.value }) }}
        />
        <label className='labelPhone'>Telefono</label>
        <input
          type='text'
          id='Phone'
          placeholder='Ej. 55 36 56 95 12'
          value={valor.phone}
          onChange={(event) => { actualizarValor({ ...valor, phone: event.target.value }) }}
        />
        <label className='labelEmergency'>Contacto de emergencia</label>
        <input
          type='text'
          id='Emergency'
          placeholder='Ej. Mariana  55 36 56 95 12'
          value={valor.contEmergency}
          onChange={(event) => { actualizarValor({ ...valor, contEmergency: event.target.value }) }}
        />
        <label className='labelDate'>Fecha de ingreso</label>
        <input
          type='text'
          id='Date'
          placeholder='Ej. 25 - 05 -2022'
          value={valor.date}
          onChange={(event) => { actualizarValor({ ...valor, date: event.target.value }) }}
        />
        <label className='labelContract'>Tipo de contrato</label>
        <input
          type='text'
          id='Contract'
          placeholder='Ej. Tiempo completo'
          value={valor.contract}
          onChange={(event) => { actualizarValor({ ...valor, contract: event.target.value }) }}
        />
        <label className='labelTime'>Horario</label>
        <input
          type='text'
          id='Time'
          placeholder='Ej. 8:00 - 16:00'
          value={valor.time}
          onChange={(event) => { actualizarValor({ ...valor, time: event.target.value }) }}
        />
        <button id='record' onClick={() => { EditarUnAsociado(id) }}>Actualizar</button>
      </section>

    </section>
  );
}