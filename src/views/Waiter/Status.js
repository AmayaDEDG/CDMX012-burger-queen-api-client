// import { useEffect, useState } from 'react';
import Header from '../Administrator/products/Header';
import OrderStauts from './OrderStatus';
import styles from './Status.module.css';


const Stauts = ({ logOut }) => {


  return (
    <article className='Status'>
      <Header view={'Menu'} logOut={logOut} route={'/'} />
      <br />
      <section className={styles.tables}>
        <OrderStauts
          orderStatus={'Órdenes listas para entregar'}
          status={'ready'}
          boxColor={'pink'}
        />
        <br />
        <OrderStauts
          orderStatus={'Órdenes pendientes'}
          status={'waiting'}
          boxColor={'yellow'}
        />
        <br />
        <OrderStauts
          orderStatus={'Órdenes entregadas'}
          status={'done'}
          boxColor={'purple'}
        />
        <br />
      </section>
    </article>
  );
}

export default Stauts;