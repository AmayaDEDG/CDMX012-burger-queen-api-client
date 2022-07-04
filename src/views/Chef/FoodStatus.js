import { useEffect, useState } from 'react';
import styles from '../Waiter/OrderStatus.module.css';
import { useNavigate } from "react-router-dom";


const FoodStatus = ({ foodStatus, status }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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
      <h2>{foodStatus}</h2>
      <section className={`table-responsive ${styles.table}`}>
        <table className={`table ${styles.background}`}>
          <tbody>
            {orders && orders.filter(product => product.status === status).map((order) => (
              <tr key={order.id} className={styles.yellow}>
                <td className={styles.orderName} >
                  {order.customer}
                </td>
                <td className={styles.seeDetails} onClick={() => navigate(`/Food/${order.id}`)}>ver detalles...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}

export default FoodStatus;