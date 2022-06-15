import { useState, useLayoutEffect } from 'react';
import plus from '../../../Components/images/Plus.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../products/Products.css';
import Header from './Header'
import { Button } from 'reactstrap';
import ModalBox from './ModalBox'; 
import Swal from 'sweetalert2';
import { FiTrash2 } from 'react-icons/fi'


const Products = ({logOut}) => {

  const [products, setProducts] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatus2, setModalStatus2] = useState(false);
  const [type, setType] = useState('type');
  const [category, setCategory] = useState('category');
  const [modalInfo, setModalInfo] = useState({});

  const formType = (e) => setType(e.target)
  const formCategory = (e) => setCategory(e.target)

  const toggle = () => {
    setModalStatus(!modalStatus);
  }

  const toggle2 = () => {
    setModalStatus2(!modalStatus2);
  }

  useLayoutEffect(() => {
    fetch('http://localhost:3001/productos')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProducts(data);
      });
  }, [])

  const createProduct = (data) => {
    fetch('http://localhost:3001/productos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        setProducts(products.concat(response));
      });
  }

  const editProduct = (data) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:3001/productos/' + modalInfo.id, requestOptions)
      .then(res => res.json())
      .then(data => {
        const newData = [...products]; //esto permite que se renderice al llamar a la funcion
        const obtained = data;
        newData.map(function (info) {
          if (obtained.id === info.id) {
            info.name = obtained.name;
            info.price = obtained.price;
            info.type = obtained.type;
            info.category = obtained.category;
            info.img = obtained.img;
          }
          return info;
        })
        console.log('Success:', data);
        setProducts(newData);
      })
  }


  const deleteProduct = async (data) => {
    await fetch('http://localhost:3001/productos/' + data.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        const newData = [...products];
        setProducts(newData.filter(info => info.id !== data.id));
      });
  }

  const deleteAction = (data) => {
    Swal.fire({
      text: '¿Eliminar ' + data.name + '?',
      showCancelButton: true,
      confirmButtonColor: '#9291E4',
      cancelButtonColor: '#9A9AAE',
      cancelButtonText:'Cancelar' ,
      confirmButtonText: '  Borrar  ',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(data)
      }
    })
  }


  const onSubmit = (data) => {
    createProduct(data);
    toggle();
  }

  const loadData = (data) => {
    toggle2();
    setModalInfo(data);
  }

  const editData = (data) => {
    editProduct(data);
    toggle2();
  }


  return (
    <article className='products'>
      <Header view={'Asociados'} logOut={logOut} route={'/AddPartners'}/>
      <section className='contents'>
        <h2 className='products-header'>Productos</h2>
        <div className='table-responsive product-list'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th className='bla'>#</th>
                <th className='bla'>Itemn</th>
                <th className='bla'>Precio</th>
                <th className='bla'>Categoría</th>
                <th className='bla'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((product) => (
                <tr key={product.id} >
                  <td className='bolded ble'>{product.id}</td>
                  <td className='ble' onClick={() => loadData(product)}>{product.name}</td>
                  {/* <td><img alt='bla'src={product.img}/></td> */}
                  <td className='ble'>{product.price}</td>
                  <td className='ble'>{product.category}</td>
                  <td className='trashIcon ble' onClick={() => deleteAction(product)}><FiTrash2 /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button id='plusProduct' onClick={toggle} >
          <img
            src={plus}
            alt='Mas'
            id='Plus'
          />
        </Button>

      </section>

      <ModalBox
        modalStatus={modalStatus}
        toggle={toggle}
        formCategory={formCategory}
        formType={formType}
        onSubmit={onSubmit}
        type={type}
        category={category}
        defVal=''
        btnText={'Guardar'}
        modalTitleText={'Agrega un nuevo producto'}
      />

      <ModalBox
        modalStatus={modalStatus2}
        toggle={toggle2}
        formCategory={formCategory}
        formType={formType}
        onSubmit={editData}
        type={type}
        category={category}
        defVal={modalInfo}
        btnText={'Editar'}
        modalTitleText={'Vista de producto'}
      />
    </article>

  );
}

export default Products;