import Header from '../Administrator/products/Header'
import styles from './Order.module.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { GrClose } from 'react-icons/gr'


const Order = ({ logOut }) => {
  const navigate = useNavigate();

  const confrimOrder = () => {
    Swal.fire({
      text: 'Orden lista para Bob',
      confirmButtonColor: '#9291E4',
      confirmButtonText: '  Aceptar  ',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('ba')
      }
    })
  }

  return (
    <>
      <Header view={'Status'} logOut={logOut} route={'/Status'} />
      <article className={styles.Order}>
        <section className={styles.text}>
          <h2>Resumen de pedido para: </h2>
          <input type='text' placeholder='Nombre de cliente...' />
        </section>
        <section className={`table-responsive ${styles.orderTable}`}>
          <table className='table'>
            <thead>
              <tr>
                <th className='blu'>ítem</th>
                <th className='blu'>Cantidad</th>
                <th className='blu'>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Holi</td>
                <td>Holi</td>
                <td>Holi</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className={styles.buttons}>
          <button className={styles.button} onClick={() => navigate(-1)}>Editar</button>
          <button className={`${styles.button} ${styles.pink}`} onClick={confrimOrder}>Confirmar</button>
        </section>
      </article>
    </>
  );
}

export default Order;