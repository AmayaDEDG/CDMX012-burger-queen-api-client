import icoBurgerQueen from '../../../Components/images/icoBurgerQueen.svg';
import React  from 'react';
import back from '../../../Components/images/back.svg'
import '../addUser/recordAsso.css';
import { auth } from '../../../lib/firebaseAuth';
import { db } from '../../../lib/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const RecordAsso = () => {
  const navigate = useNavigate();

  const partners = () => {
    navigate('/AddPartners')
  }

  const originalUser = auth.currentUser;
  console.log(originalUser);


  async function registerAssociate(email, password, name, age, phone, date, contEmergency, contract, time, job) {

    const originalUser = auth.currentUser;

    const dataAssociate = await createUserWithEmailAndPassword(
      auth,
      email,
      password).then((userFirebase) => {
        return userFirebase;

      });
    await updateCurrentUser(auth, originalUser);

    const docRef = doc(db, `empleados/${dataAssociate.user.uid}`)
    setDoc(docRef, {
      uid: dataAssociate.user.uid,
      email,
      password,
      name,
      age,
      phone,
      date,
      contEmergency,
      contract,
      time,
      job
    });

    navigate('/AddPartners')
  }


  function submitHandler(e) {
    e.preventDefault()
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const name = e.target.elements.name.value;
    const age = e.target.elements.Age.value;
    const phone = e.target.elements.Phone.value;
    const date = e.target.elements.Date.value;
    const job = e.target.elements.job.value;
    const contEmergency = e.target.elements.Emergency.value;
    const contract = e.target.elements.Contract.value;
    const time = e.target.elements.Time.value;
    registerAssociate(email, password, name, age, phone, date, contEmergency, contract, time, job)

  }

  return (

    <section className='RecordAsso'>
      <div className='header'>

             <img src={icoBurgerQueen} alt='Burger Queen Logo' id='icoBurgerQueen'/>
             <button id='back' onClick={partners}><img src={back} alt='Volver' id='backImg'/></button>

      </div>
      <h3 className='asso'>Alta de Asociado</h3>
      <form className='form' onSubmit={submitHandler}>
        <label className='labelName'>Nombre</label>
        <input
          type='text'
          id='name'
          placeholder='Ej. Amaya De Esesarte'
        />
        <label className='labelEmail'>Correo</label>
        <input
          type='e-mail'
          id='email'
          placeholder='Ej. m1amaya@burgerqueen.com'
        />
        <label className='labelPassword'>Contraseña</label>
        <input
          type='text'
          id='password'
          placeholder='Ej. ama1234'
        />
        <select id='job'>
          <option value="puesto">Puesto</option>
          <option value="Gerente">Gerente</option>
          {/* <option value="Jefe de Cocina">Jefe de Cocina</option> */}
          <option value="Cocinero">Cocinero</option>
          {/* <option value="Jefe de Meseros">Jefe de Meseros</option> */}
          <option value="Mesero">Mesero</option>
          {/* <option value="Limpieza">Limpieza</option> */}
        </select>

        <label className='labelAge'>Edad</label>
        <input
          type='text'
          id='Age'
          placeholder='Ej. 24 años'
        />
        <label className='labelPhone'>Telefono</label>
        <input
          type='text'
          id='Phone'
          placeholder='Ej. 55 36 56 95 12'
        />
        <label className='labelEmergency'>Contacto de emergencia</label>
        <input
          type='text'
          id='Emergency'
          placeholder='Ej. Mariana  55 36 56 95 12'
        />
        <label className='labelDate'>Fecha de ingreso</label>
        <input
          type='text'
          id='Date'
          placeholder='Ej. 25 - 05 -2022'
        />
        <label className='labelContract'>Tipo de contrato</label>
        <input
          type='text'
          id='Contract'
          placeholder='Ej. Tiempo completo'
        />
        <label className='labelTime'>Horario</label>
        <input
          type='text'
          id='Time'
          placeholder='Ej. 8:00 - 16:00'
        />
        <button id='record' type='submit'>Dar de alta</button>
      </form>

    </section>
  );
}