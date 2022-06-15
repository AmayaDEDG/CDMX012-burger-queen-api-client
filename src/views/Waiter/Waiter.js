// import React  from 'react';
import { useState, useEffect } from 'react';
import styles from './Waiter.module.css';
import Header from '../Administrator/products/Header'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillMinusCircle } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const Waiter = ({ logOut }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('Desayuno');
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0)
  const [orderItems, setOrderItems] = useState([])

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

  const handleCount = ({ target: { name, value } }) => {

  }



  return (
    <article className='Waiter'>
      <Header view={'Status'} logOut={logOut} route={'/Status'} />
      <section className={styles.wElements}>
        <select className={styles.waiterSelect} name='category' id='category' value={category} onChange={handleCategory}>
          <option value='Desayuno'>Desayuno</option>
          <option value='Comida'>Comida</option>
        </select>
        <div className={`table-responsive product-list ${styles.waiterTable}`} >
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th className='bla'>ítem</th>
                <th className='bla'>Precio</th>
                <th className='bla'>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {products && products.filter(product => product.category === category).map((product) => (
                <tr key={product.id} >
                  <td className='ble' >
                    <img alt={product.name} src={product.img} className={styles.imgs} /><br />
                    {product.name}
                  </td>
                  <td className='ble'>{product.price}</td>
                  <td className='ble'><AiFillMinusCircle color='#DFAD19' fontSize='300%' />  {count}  <BsFillPlusCircleFill color='#F645D4' fontSize='300%' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <button>Cancelar</button> */}
        <button className={styles.button} onClick={() => navigate('/Order')}>
          Resumen
        </button>
      </section>

    </article>
  );
}

export default Waiter;