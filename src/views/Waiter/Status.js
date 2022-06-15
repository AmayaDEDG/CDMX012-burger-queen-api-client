import Header from '../Administrator/products/Header';
import OrderStauts from './OrderStatus';
import styles from './Status.module.css';


const Stauts = ({ logOut }) => {

  return (
    <article className='Status'>
      <Header view={'Menu'} logOut={logOut} route={'/'} />
      <br />
      <section className={styles.tables}>
        <OrderStauts orderStatus={'Órdenes listas para entregar'}/>
        <br />
        <OrderStauts orderStatus={'Órdenes pendientes'}/>
        <br />
        <OrderStauts orderStatus={'Órdenes entregadas'}/>
        <br />
      </section>
    </article>
  );
}

export default Stauts;