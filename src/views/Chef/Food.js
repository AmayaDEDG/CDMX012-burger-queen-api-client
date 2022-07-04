import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Administrator/products/Header'



const Food = ({ logOut }) => {

  const [food, setFood] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/pedidos/' + id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFood(data);
      });
  }, [id])

  const arr = food.order
  console.log(food.order)

  return (
    <>
      <Header view={'Atrás'} logOut={logOut} route={'/'} />
      <h2>{food.customer}</h2>
      {arr && arr.map((item, index) => {
        return (
          <section key={index}>
            <h2>{item.name}</h2>
            <h2>{item.quantity}</h2>
            <h2>{item.price}</h2>
          </section>
        )
      })}
    </>
  );
}

export default Food;