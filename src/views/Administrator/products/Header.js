import React  from 'react';
import '../products/Header.css';
import icoBurgerQueen from '../../../Components/images/icoBurgerQueen.svg';
import { useNavigate } from "react-router-dom";


const Header = ({view, logOut, route}) => {
  const navigate = useNavigate();
  const returnHome = () => {
    logOut();
    navigate('/');
  }
  return (
    <article>
      <div className='header'>
        <img
          src={icoBurgerQueen}
          alt='Burger Queen'
          id='icoBurgerQueen'
          style={{ width: '90px', height:'90px' }}
        />
        <button
          className='employees'
          onClick={() => navigate(route)}
        >{view}
        </button>
        <button
          className='log-out'
          onClick={returnHome}
        >Log Out
        </button>
      </div>
    </article>
  )
}


export default Header