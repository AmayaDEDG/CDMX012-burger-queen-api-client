import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plus from '../images/Plus.svg';
import menos from '../images/menos.svg';
import './menu.css'



const dataProducts = 'http://localhost:3001/productos';

export const Menu = () => {

  const [productos, obtenerProductos] = useState([]);

  const menuData = async () =>{
     await axios.get(dataProducts)
      .then(response=>{
        obtenerProductos(response.data);
      })
  }

  useEffect(()=>{
    menuData();
  },[])


    return(
      <>
      {productos.map(producto=>(
        <section className='menu' key={producto.id}>
        <div className='item'>
            <img src={producto.img} alt='comida'/>
            <h5>{producto.name}</h5>
        </div>
        <div className='price'>
          <h5>{producto.price}</h5>
        </div>
        <div className='comanda'>
          <button><img src={menos} alt='menos'/></button>
          <h5>15</h5>
          <button><img src={Plus} alt='mas'/></button>
        </div>
        </section>
       ))}
       </>
    )
}