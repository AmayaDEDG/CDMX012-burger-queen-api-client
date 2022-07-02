import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import Header from '../Administrator/products/Header'
import Counter from './Counter'
import Order from './Order';


const Waiter = ({ logOut }) => {

  const [category, setCategory] = useState('Desayuno');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [order, setOrder] = useState([]);
  const [totalQuant, setTotalQuant] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

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
    setQuantity(0);
  };

  const toggle = () => {
    setModalStatus(!modalStatus);
  }

  const total = () => {
    let totalQ = 0;
    for (let i = 0; i < order.length; i++) {
      totalQ += order[i].quantity
    }
    setTotalQuant(totalQ);

    let totalP = 0;
    for (let i = 0; i < order.length; i++) {
      totalP += parseInt(order[i].price) * parseInt(order[i].quantity)
    }
    setTotalPrice(totalP)
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
                  <h5>${product.price}</h5>
                </section>

                <Counter
                  product={product}
                  setQuantity={setQuantity}
                  setOrder={setOrder}
                  order={order}
                />

              </div>)
          })}
        </article>
        <br />
        {(order.length > 0) &&
          <button className={`${styles.button} ${styles.delete}`} onClick={() => { setQuantity(0); setOrder([]) }}>
            Cancelar
          </button>}
        <button className={styles.button} onClick={() => { total(); toggle() }}>
          Resumen
        </button>
      </section>

      <Order
        modalStatus={modalStatus} //findDOMNode is deprecated in StrictMode. 
        toggle={toggle}
        order={order}
        totalPrice={totalPrice}
        totalQuant={totalQuant}

      />

    </>
  );
}

export default Waiter;