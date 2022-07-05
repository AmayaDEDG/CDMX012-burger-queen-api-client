import { useEffect, useState } from 'react';
import Header from '../Administrator/products/Header';
import OrderStauts from './OrderStatus';
import styles from './Status.module.css';
import axios from 'axios';


const Stauts = ({ logOut }) => {
  const [orders, setOrders] = useState([]);

  const dataOrders = 'http://localhost:3001/pedidos';

  const ordersData = async () => {
    await axios.get(dataOrders)
      .then(response => {
        setOrders(response.data);
      })
  }

  useEffect(() => {
    ordersData()
  }, [])


  return (
    <article className='Status'>
      <Header view={'Menu'} logOut={logOut} route={'/'} />
      <br />
      <section className={styles.tables}>
        <OrderStauts
          orderStatus={'Órdenes listas para entregar'}
          status={'ready'}
          orders={orders}
          ordersData={ordersData}
        />
        <br />
        <OrderStauts
          orderStatus={'Órdenes pendientes'}
          status={'waiting'}
          orders={orders}
          ordersData={ordersData}
        />
        <br />
        <OrderStauts
          orderStatus={'Órdenes entregadas'}
          status={'done'}
          orders={orders}
          ordersData={ordersData}
        />
        <br />
      </section>
    </article>
  );
}

export default Stauts;