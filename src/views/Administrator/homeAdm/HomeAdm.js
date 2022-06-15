//import { Logo } from "../../../Components/Logo/Logo";
 import React  from 'react';
import burgerQueen from '../../Login/images/burgerQueen.svg'
import '../homeAdm/homeAdm.css';
import { useNavigate } from "react-router-dom";

export const HomeAdm = ({logOut}) => {
  const navigate = useNavigate();

  const partners = () => {
    navigate('/AddPartners')
  }

  return (
    <section className='homeAdm'>
      <img
        src={burgerQueen}
        alt='Burger Queen logo'
        id='BurgerQueen'
        onClick={logOut}
      />
      <h2>Gerencia</h2>
      <button
        id='btnProducts'
        onClick={partners}
      >
        Asociados
      </button>
      <button
        id='btnAssociates'
        onClick={() => navigate('/Products')}
      >
        Productos
      </button>
    </section>
  );
}

export default HomeAdm;