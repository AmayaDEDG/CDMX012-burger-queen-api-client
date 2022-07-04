import { useEffect, useState } from 'react';
import styles from './OrderStatus.module.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';



const OrderStauts = ({ orderStatus, status }) => {
  const [orders, setOrders] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [order, setOrder] = useState({});

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

  const deliverOrder = async () => {
    await axios
      .patch('http://localhost:3001/pedidos/' + order.id, {
        status: 'done',
      }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });
    setOrders([]);
    ordersData(); //jala bien pero no se actualiza el de 'done'
    toggle();
  }

  const toggle = () => {
    setModalStatus(!modalStatus);
  }

  const closeModal = () => {
    toggle();
  }

  const statusTitle = () => {
    if(order.status === 'waiting'){
      return(
        'En preparación'
      )
    } else if(order.status === 'ready'){
      return(
        'Lista para entrega'
      )
    }if(order.status === 'done'){
      return(
        'Entregada'
      )
    }
  }

  return (
    <article className='OrderStatus'>
      <h2>{orderStatus}</h2>
      <section className={`table-responsive ${styles.table}`}>
        <table className={`table ${styles.background}`}>
          <tbody>
            {orders && orders.filter(product => product.status === status).map((order) => (
              <tr
                key={order.id}
                className={styles.yellow}
                onClick={() => {
                  toggle();
                  setOrder(order);
                }}
              >
                <td className={styles.orderName} >
                  {order.customer}
                </td>
                <td className={styles.seeDetails}>ver detalles...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal isOpen={modalStatus} toggle={closeModal} style={{ maxWidth: '85%', width: '100%', marginTop: '15%' }}>
        <ModalHeader className={styles.header} close={<button className="close" onClick={closeModal}><GrClose /></button>}>
          <h2>Resumen de pedido:</h2>
        </ModalHeader>
        <ModalBody >
          <h3><strong>Cliente:</strong> {order.customer}</h3>
          <h3 className={styles.body}><strong>Orden:</strong></h3>
          {order.order && order.order.map((item, index) => {
            return (
              <section className={styles.menu} key={index}>
                <h4>{item.name}</h4>
                <h4>x{item.quantity}</h4>
                <h4>${item.price}</h4>
              </section>
            )
          })}
          <section className={styles.menu}>
            <h4 className='bolded'>TOTAL</h4>
            <h4 className='bolded'>x{order.totalQuantity}</h4>
            <h4 className='bolded'>${order.totalPrice}.00</h4>
          </section>
          <section className={styles.body}>
          <h3><strong>Tiempo:</strong></h3>
            <h4>De registro de orden: {order.timeReceived}</h4>
            {order.timeDelivered && <h4>De término de preparación: {order.timeDelivered}</h4>}
            <h4>{order.price}</h4>
          </section>
          <section className={`${styles.body} ${styles.footer}`}>
            <h3><strong>Status: </strong>{statusTitle()}</h3>
          </section>
          {order.status === 'ready' && <button className={styles.button} onClick={deliverOrder}>Entregar orden</button>}
        </ModalBody>
      </Modal>

    </article>
  );
}

export default OrderStauts;