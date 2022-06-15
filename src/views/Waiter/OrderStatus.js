import { useEffect, useState } from 'react';
import styles from './OrderStatus.module.css';

const OrderStauts = ({ orderStatus, status }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/pedidos')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setOrders(data);
      });
  }, [])

  return (
    <article className='OrderStatus'>
      <h2>{orderStatus}</h2>
      <section className={`table-responsive ${styles.table}`}>
        <table className={`table ${styles.background}`}>
          <tbody>
            {orders && orders.filter(product => product.status === status).map((order) => (
                <tr key={order.id} >
                  <td className={styles.orderName} >
                    {order.customer}
                  </td>
                  <td className={styles.seeDetails}>ver detalles...</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}

export default OrderStauts;