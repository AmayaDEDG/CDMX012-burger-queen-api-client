import React  from 'react';
import Header from '../Administrator/products/Header';
import './HomeWaiter.css';
import { Menu } from '../../Components/waiter/Menu.js'


const Waiter = ({ logOut }) => {

  return (
   <>
    <Header view={'Status'} logOut={logOut} route={'/Status'} />
            
     <section className='HeaderTable'>
     <h5>Ítem</h5>
     <h5>Precio</h5>
     <h5>Cantidad</h5>
     </section>
     <Menu/>
   </>
  );
}

export default Waiter;