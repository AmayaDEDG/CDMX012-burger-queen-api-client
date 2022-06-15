import React from 'react';
import chef from '../../Components/images/chef.svg'
import './provisional.css'


const Chef = ({ logOut }) => {
  return (
    <section className='HomeChef'>
      <img
        src={chef}
        alt='mesero'
        id='construccion'
      />
      <button
        id='logOut'
        onClick={logOut}>
        Cerrar Sesión
      </button>
    </section>
  );
}

export default Chef;