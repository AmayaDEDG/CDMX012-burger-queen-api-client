import styles from './Order.module.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, FormGroup, Form, Label } from 'reactstrap';
import { useForm } from "react-hook-form";
import { GrClose } from 'react-icons/gr'


const Order = ({ toggle, modalStatus, order, totalQuant, totalPrice }) => {

  const [client, setClient] = useState(null)
  const confrimOrder = () => {
    Swal.fire({
      text: `Orden lista para ${client}`,
      confirmButtonColor: '#9291E4',
      confirmButtonText: '  Aceptar  ',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Orden registrada')
      }
    })
  }

  const closeModal = () => {
    toggle();
    setClient(null)
  }


  return (
    <Modal isOpen={modalStatus} toggle={closeModal} style={{ maxWidth: '95%', width: '100%', marginTop: '15%' }}>
      <ModalHeader close={<button className="close" onClick={closeModal}><GrClose /></button>}>
      </ModalHeader>
      <ModalBody className={styles.Order}>
        <section className={styles.text}>
          <h2 className='bolded'>Resumen de pedido para:  </h2>
          <input
            type='text'
            placeholder='Nombre de cliente'
            className={styles.client}
            onChange={(e) => setClient(e.target.value)}
          />
        </section>
        <article className={styles.orderTable}>
          <section className={styles.HeaderTable}>
            <h4 className='bolded'>Ítem</h4>
            <h4 className='bolded'>Cantidad</h4>
            <h4 className='bolded'>Precio</h4>
          </section>
          {order && order.map((product, index) => {
            return (
              <section className={styles.menu} key={index} >
                <h5>{product.name}</h5>
                <h5>x{product.quantity}</h5>
                <h5>${parseInt(product.price) * product.quantity}.00</h5>
              </section>
            )
          })}
          <section className={`${styles.menu} ${styles.down}`}>
            <h4 className='bolded'>TOTAL</h4>
            <h4 className='bolded'>x{totalQuant}</h4>
            <h4 className='bolded'>${totalPrice}.00</h4>
          </section>
        </article>
        <section className={styles.buttons}>
          <button className={styles.button} onClick={closeModal}>Editar</button>
          <button className={`${styles.button} ${styles.pink}`} onClick={confrimOrder}>Confirmar</button>
        </section>
      </ModalBody>
    </Modal>
  );
}

export default Order;