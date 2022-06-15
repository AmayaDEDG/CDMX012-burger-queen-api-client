import Header from '../Administrator/products/Header'
import styles from './Order.module.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
                <th className='blu'>Precio</th>
                <th className='blu'>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Holi</td>
                <td>Holi</td>
                <td>Holi</td>
              </tr>
              {/* {products && products.filter(product => product.category === category).map((product) => (
                <tr key={product.id} >
                  <td className='ble' >
                    <img alt={product.name} src={product.img} className={styles.imgs}/><br/>
                    {product.name}
                  </td>
                  <td className='ble'>{product.price}</td>
                  <td className='ble'><AiFillMinusCircle color='#DFAD19' fontSize='300%' />  0  <BsFillPlusCircleFill  color='#F645D4' fontSize='300%'/></td>
                </tr>
              ))} */}
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