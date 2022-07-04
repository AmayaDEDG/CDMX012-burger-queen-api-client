import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Administrator/products/Header';
import styles from './Food.module.css';
import axios from 'axios';



const Food = ({ logOut }) => {

  const [food, setFood] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/pedidos/' + id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFood(data);
      });
  }, [id])


  const finishOrder = async () => {
    await axios
      .patch('http://localhost:3001/pedidos/' + id, {
        status: 'ready',
      }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });
    navigate('/')
  }


  const arr = food.order

  return (
    <>
      <Header view={'Atrás'} logOut={logOut} route={'/'} />
      <article className={styles.order}>
        <h2 className='bolded'>{food.customer}</h2>
        <br />
        <section className={styles.food}>
          <section className={styles.header}>
            <h2 className='bolded'>Ítem</h2>
            <h2 className='bolded'>Cantidad</h2>
            <h2 className='bolded'>Listo</h2>
          </section>
          <br /><br />
          {arr && arr.map((item, index) => {
            return (
              <section key={index} className={styles.item}>
                <h2>{item.name}</h2>
                <h2>x{item.quantity}</h2>
                <br /><br /><br />
              </section>
            )
          })}
        </section>
        <br /><br />
        <button className={styles.button} onClick={finishOrder}>Orden lista</button>
      </article>

    </>
  );
}

export default Food;