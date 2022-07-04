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
      return (<h2 className={styles.boxed}>Lista para entregar</h2>)
    } else if (food.status === 'waiting') {
      return (<h2 className={styles.boxed}> Preparación pendiente</h2>)
    } else if (food.status === 'done') {
      return (<h2 className={styles.boxed}>Entregada</h2>)
    }
  }

  return (
    <>
      <HeaderChef logOut={logOut} />
      <article className={styles.order}>
        <section className={styles.header}>
          <BsArrowLeftCircleFill className={styles.back} onClick={() => navigate(-1)} />
          {filterTilte()}
        </section>
        <br /><br />
        <h2 className='bolded'>Orden para: {food.customer && (food.customer).toUpperCase()}</h2>
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
                <h4>{item.name}</h4>
                <h4>x{item.quantity}</h4>
                <br /><br /><br />
              </section>
            )
          })}
          <section className={styles.item}>
            <h4 className='bolded'>TOTAL</h4>
            <h4 className='bolded'>{food.totalQuantity}</h4>
            <br /><br /><br />
            <h4 className='bolded'>Hora de registro:</h4>
            <h4 className='bolded'>{food.timeReceived}</h4>
            <br />
            {food.status === 'ready' && <h4 className='bolded'>Hora de preparado:</h4>} {/* TAMBIÉN EL 'DONE'*/}
            {food.status === 'ready' && <h4 className='bolded'>{food.timeDelivered}</h4>}
          </section>
        </section>
        <br /><br />
        {food.status === 'waiting' ? <button className={styles.button} onClick={finishOrder}>Orden lista</button> : <b />}
      </article>

    </>
  );
}

export default Food;