import styles from './Waiter.module.css';
import { useState } from 'react';
import Plus from '../../Components/images/Plus.svg';
import menos from '../../Components/images/menos.svg';


const Counter = ({ product, setQuantity, setOrder, order }) => {
  const [count, setCount] = useState(product.quantity);
  const arr = []

  const sendOrder = (count) => {
    setQuantity(count);
    product.quantity = count;
    arr.push(product);
    if (order.some(el => el.id === product.id)) {
      const noDoubles = order.map(obj => arr.find(o => o.id === obj.id) || obj);
      const withQuantity = noDoubles.filter(el => el.quantity !== 0)
      setOrder(withQuantity)
    } else {
      setOrder([...order, ...arr]); //EUREKA
    }
  }

  const handleLess = async () => {
    if (count > 0) {
      setCount(parseInt(count) - 1);
      const newCount = parseInt(count) - 1;
      sendOrder(newCount);
    };

  }
  const handleMore = async () => {
    setCount(parseInt(count) + 1);
    const newCount = parseInt(count) + 1;
    sendOrder(newCount);
  }


  return (
    <section className={styles.comanda}>
      <button onClick={() => handleLess()}><img src={menos} alt='ícono de menos' /></button>
      <h5>{count}</h5>
      <button onClick={() => handleMore()}><img src={Plus} alt='ícono de más' /></button>
    </section>
  )
}

export default Counter;