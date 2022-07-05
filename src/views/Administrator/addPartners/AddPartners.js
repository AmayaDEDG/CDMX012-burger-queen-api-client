// import icoBurgerQueen from '../../../Components/images/icoBurgerQueen.svg';
import plus from '../../../Components/images/Plus.svg';
import '../../Administrator/addPartners/AddPartnes.css';
import React  from 'react';
import { useNavigate } from "react-router-dom";
import { Associate } from '../../../Components/associate/Associate.js';
import Header from '../products/Header'


export const AddPartners = ({ logOut }) => {
  const navigate = useNavigate();

  const partners = () => {
    navigate('/RecordAsso')
  }

  return (
    <section className='addPartners'>

      <Header view={'Productos'} logOut={logOut} route={'/Products'} />

      <h3 className='bolded size-text asso'>Asociados</h3>
      <section id='listaDeAsociados'>
        <div id='tarjetaCategory'>
          <div><h5 className='bolded bigger'>Nombre</h5></div>
          <div><h5 className='bolded bigger'>Puesto</h5></div>
        </div>
        <Associate />
      </section>
      <button
        id='plusPartners'
        onClick={partners}
      >
        <img
          src={plus}
          alt='Mas'
          id='Plus'
        />
      </button>
    </section>
  );
}