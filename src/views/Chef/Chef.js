import Header from '../Administrator/products/Header'
import styles from '../Waiter/Status.module.css';
import FoodStatus from './FoodStatus';


const Chef = ({ logOut }) => {
  return (
    <>
      <Header logOut={logOut} />
      <article className='Status'>
      <br />
      <section className={styles.tables}>
        <FoodStatus
          foodStatus={'Órdenes listas para entregar'}
          status={'ready'}
        />
        <br />
        <FoodStatus
          foodStatus={'Órdenes pendientes'}
          status={'waiting'}
        />
        <br />
        <FoodStatus
          foodStatus={'Órdenes entregadas'}
          status={'done'}
        />
        <br />
      </section>
    </article>
    </>
  );
}

export default Chef;