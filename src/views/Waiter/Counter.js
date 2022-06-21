import styles from './Waiter.module.css';
import { useState, useLayoutEffect } from 'react';
import Plus from '../../Components/images/Plus.svg';
import menos from '../../Components/images/menos.svg';


const Counter = ({ product, setQuantity }) => {
  const [count, setCount] = useState(product.quantity);
  // const [quant, setQuant] = useState()

  useLayoutEffect(() => {
    setQuantity(count)
    console.log(count)
    // console.log(product)
  }, [count, setQuantity]);

  const handleLess = () => {
    setCount(parseInt(count) - 1);
    console.log(count)
    // setQuantity(count);
    // console.log(product)
  }
  const handleMore = () => {
    setCount(parseInt(count) + 1);
    // console.log(count)
    // setQuantity(count);
    // console.log(product)
  }

  return (
    <section className={styles.comanda}>
      <button onClick={() => handleLess()}><img src={menos} alt='ícono de menos' /></button>
      <h5 onClick={()=> console.log(product)}>{count}</h5>
      <button onClick={() => handleMore()}><img src={Plus} alt='ícono de más' /></button>
    </section>
  )
}

export default Counter;