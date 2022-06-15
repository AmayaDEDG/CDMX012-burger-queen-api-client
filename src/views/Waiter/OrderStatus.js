import styles from './OrderStatus.module.css';

const OrderStauts = ({orderStatus}) => {

  return (
    <article className='OrderStatus'>
    <h2>{orderStatus}</h2>
    <section className={`table-responsive ${styles.table}`}>
          <table className={`table ${styles.background}`}>
            <tbody>
              <tr>
                <td className={styles.orderName}>Holi</td>
                <td className={styles.seeDetails}>Ver detalles... </td>
              </tr>

              {/* {products && products.filter(product => product.category === category).map((product) => (
                <tr key={product.id} >
                  <td className='ble' >
                    <img alt={product.name} src={product.img} className={styles.imgs}/><br/>
                    {product.name}
                  </td>
                  <td className='ble'>{product.price}</td>
                  <td className='ble'><AiFillMinusCircle color='#DFAD19' fontSize='300%' />  0  <BsFillPlusCircleFill  color='#F645D4' fontSize='300%'/></td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </section>
    </article>
  );
}

export default OrderStauts;