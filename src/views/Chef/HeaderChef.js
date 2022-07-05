import icoBurgerQueen from '../../Components/images/icoBurgerQueen.svg';


const HeaderChef = ({ logOut }) => {
  const returnHome = () => {
    logOut();
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
          className='log-out'
          onClick={returnHome}
        >Log Out
        </button>
      </div>
    </article>
  )
}


export default HeaderChef;