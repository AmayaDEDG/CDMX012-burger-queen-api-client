import { useEffect, useState } from 'react';
import styles from './OrderStatus.module.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GrClose } from 'react-icons/gr'


const OrderStauts = ({ orderStatus, status }) => {
  const [orders, setOrders] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);


  useEffect(() => {
    fetch('http://localhost:3001/pedidos')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setOrders(data);
      });
  }, [])

  // const showDetails = () => {}

  const toggle = () => {
    setModalStatus(!modalStatus);
  }

  const closeModal = () => {
    toggle();
  }

  return (
    <article className='OrderStatus'>
      <h2>{orderStatus}</h2>
      <section className={`table-responsive ${styles.table}`}>
        <table className={`table ${styles.background}`}>
          <tbody>
            {orders && orders.filter(product => product.status === status).map((order) => (
              <tr key={order.id} className={styles.yellow} onClick={toggle}>
                <td className={styles.orderName} >
                  {order.customer}
                </td>
                <td className={styles.seeDetails}>ver detalles...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal isOpen={modalStatus} toggle={closeModal}>
        <ModalHeader close={<button className="close" onClick={closeModal}><GrClose /></button>}>
          <h4>Resumen de pedido:</h4>
        </ModalHeader>
        <ModalBody>
          <h5>Cliente</h5>
          <h5>Orden</h5>
          <h5>Status</h5>
        </ModalBody>
      </Modal>

    </article>
  );
}

export default OrderStauts;