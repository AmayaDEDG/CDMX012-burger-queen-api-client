// import React  from 'react';
import { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import Header from '../Administrator/products/Header'
import { useNavigate } from "react-router-dom";
import Plus from '../../Components/images/Plus.svg';
import menos from '../../Components/images/menos.svg';

const Waiter = ({ logOut }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('Desayuno');
  const [products, setProducts] = useState([]);
  // const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProducts(data);
      });
  }, [])

  const handleCategory = (e) => {
    setCategory(e.target.value)
  };

  // const handleCount = ({ target: { name, value } }) => {

  // }



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
          {products && products.filter(product => product.category === category).map((product) => (
            <div className={styles.menu} key={product.id}>
              <section className={styles.item}>
                <img src={product.img} alt='comida' />
                <h5>{product.name}</h5>
              </section>
              <section className={styles.price}>
                <h5>{product.price}</h5>
              </section>
              <section className={styles.comanda}>
                <button><img src={menos} alt='ícono de menos' /></button>
                <h5>0</h5>
                <button><img src={Plus} alt='ícono de más' /></button>
              </section>
            </div>))}
        </article>
        <br />
        {/* <button>Cancelar</button> */}
        <button className={styles.button} onClick={() => navigate('/Order')}>
          Resumen
        </button>
      </section>

    </>
  );
}

export default Waiter;