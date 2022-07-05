import { useState, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderChef from './HeaderChef';
import styles from './Food.module.css';
import axios from 'axios';
import { BsArrowLeftCircleFill } from 'react-icons/bs'



const Food = ({ logOut }) => {

  const [food, setFood] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
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
    const time = new Date();
    const [hour, minutes] = [time.getHours(), time.getMinutes()];
    const date = hour + ':' + minutes
    await axios
      .patch('http://localhost:3001/pedidos/' + id, {
        timeDelivered: date,
      }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });
    navigate('/')
  }


  const arr = food.order

  const filterTilte = () => {
    if (food.status === 'ready') {
      return (<h3 className={styles.boxed}>Lista para entregar</h3>)
    } else if (food.status === 'waiting') {
      return (<h3 className={styles.boxed}> Preparación pendiente</h3>)
    } else if (food.status === 'done') {
      return (<h3 className={styles.boxed}>Entregada</h3>)
    }
  }

  return (
    <>
      <HeaderChef logOut={logOut} />
      <article className={styles.order}>
        <section className={styles.above}>
          <BsArrowLeftCircleFill className={styles.back} onClick={() => navigate(-1)} />
          {filterTilte()}
        </section>
        <br />
        <h2 className='bolded'>Orden para: {food.customer && (food.customer).toUpperCase()}</h2>
        <br />
        <section className={styles.food}>
          <section className={styles.header}>
            <h3 className='bolded'>Ítem</h3>
            <h3 className='bolded'>Cantidad</h3>
            {/* <h3 className='bolded'>Listo</h3> */}
          </section>
          <br />
          {arr && arr.map((item, index) => {
            return (
              <section key={index} className={styles.item}>
                <h4>{item.name}</h4>
                <h4>x{item.quantity}</h4>
                <br />
              </section>
            )
          })}
          <section className={styles.item}>
            <h4 className='bolded'>TOTAL</h4>
            <h4 className='bolded'>x{food.totalQuantity}</h4>
            <br />
          </section>
          <h3 className={styles.time}><strong>Tiempo:</strong></h3>
          <section className={styles.hour}>
            <h4>Hora de registro:</h4>
            <h4 className='bolded'>{food.timeReceived}</h4>
            {food.status !== 'waiting' && <h4>Hora de preparado:</h4>}
            {food.status !== 'waiting' && <h4 className='bolded'>{food.timeDelivered}</h4>}
          </section>
        </section>
        <br /><br />
        {food.status === 'waiting' ? <button className={styles.button} onClick={finishOrder}>Orden lista</button> : <b />}
      </article>

    </>
  );
}

export default Food;