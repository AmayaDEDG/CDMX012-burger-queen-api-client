import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import Header from '../Administrator/products/Header'
import { useNavigate } from "react-router-dom";
import Counter from './Counter'


const Waiter = ({ logOut }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('Desayuno');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0)

  // useEffect(() => {
  //   fetch('http://localhost:3001/productos')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setProducts(data);
  //     });
  // }, [])


  const dataProducts = 'http://localhost:3001/productos';

  const menuData = async () => {
    await axios.get(dataProducts)
      .then(response => {
        setProducts(response.data);
      })
  }

  useEffect(() => {
    menuData();
  }, [])


  const handleCategory = (e) => {
    setCategory(e.target.value);
  };


  return (
    <>
      <Header view={'Status'} logOut={logOut} route={'/Status'} />
      <section className={styles.wElements}>
        <select className={styles.waiterSelect} name='category' id='category' value={category} onChange={handleCategory}>
          <option value='Desayuno'>Desayuno</option>
          <option value='Comida'>Comida</option>
        </select>
        <br />
        <article className={styles.menuTable}>
          <section className={styles.HeaderTable}>
            <h5>Ítem</h5>
            <h5>Precio</h5>
            <h5>Cantidad</h5>
          </section>
          {products && products.filter(product => product.category === category).map((product, index) => {
            product = { ...product, quantity: `${quantity}` }
            return (
              <div className={styles.menu} key={product.id}>
                <section className={styles.item}>
                  <img src={product.img} alt={product.name} />
                  <h5>{product.name}</h5>
                </section>
                <section className={styles.price}>
                  <h5>{product.price}</h5>
                </section>
                <Counter product={product} setQuantity={setQuantity} />
              </div>)
          })}
        </article>
        <br />
        {/* <button>Cancelar</button> */}
        <button className={styles.button} onClick={() =>{ navigate('/Order'); console.log(quantity)}}>
          Resumen
        </button>
      </section>

    </>
  );
}

export default Waiter;