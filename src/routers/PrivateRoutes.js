import { useState } from 'react';
import React  from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeAdm } from '../views/Administrator/homeAdm/HomeAdm.js'
import { AddPartners } from '../views/Administrator/addPartners/AddPartners.js'
import Waiter from '../views/Waiter/Waiter';
import Chef from '../views/Home/Chef';
import { auth, logOut } from '../lib/firebaseAuth.js'
import { onAuthStateChanged } from 'firebase/auth';
import { RecordAsso } from '../views/Administrator/addUser/RecordAsso.js';
import Products from '../views/Administrator/products/Products.js';
import Status from '../views/Waiter/Status';
import Order from '../views/Waiter/Order';
import { EditDeleteAsso } from '../Components/associate/EditDeleteAsso.js';

const PrivateRoutes = () => {
  const [role, setRole] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email
      const initial = userEmail[0]
      if (initial === 'g') {
        setRole('administrator')
      } else if (initial === 'm') {
        setRole('waiter')
      } else if (initial === 'c') {
        setRole('chef')
      }
    }
  });

  if (role === 'administrator') {
    return (
      <Routes>
        <Route path='/' element={<HomeAdm logOut={logOut} />} />
        <Route path='/AddPartners' element={<AddPartners logOut={logOut}/>} />
        <Route path='/RecordAsso' element={<RecordAsso />} />
        <Route path='/Products' element={<Products logOut={logOut}/>} />
        <Route path='/EditDeletAsso/:id' element={<EditDeleteAsso/>} />
      </Routes>
    )
  } else if (role === 'waiter') {
    return (
      <Routes>
        <Route path='/' element={<Waiter logOut={logOut} />} />
        <Route path='/Order' element={<Order logOut={logOut}/>} />
        <Route path='/Status' element={<Status logOut={logOut}/>} />
      </Routes>
    )
  } else if (role === 'chef') {
    return (
      <Routes>
        <Route path='/' element={<Chef logOut={logOut} />} />
      </Routes>
    )
  }
}

export default PrivateRoutes;