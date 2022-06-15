import { useState } from 'react';
import React from 'react';
import './sweetAlert.css';
import AppRouter from './routers/AppRouter';
import { getAuth, onAuthStateChanged } from "firebase/auth";

  function App() {
  const [isAuth, setIsAuth] = useState(null)
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuth(user)
    } else {
      setIsAuth(null)
    }
  });
  return (
    <section className='app'>
        <AppRouter isAuth={isAuth} />
    </section>
  );
}

// import React from "react";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Login } from "./views/Login/Login.js";
// import { HomeAdm } from "./views/Administrator/homeAdm/HomeAdm.js";
// import { AddPartners } from "./views/Administrator/addPartners/AddPartners.js";
// import { RecordAsso } from "./views/Administrator/addUser/RecordAsso.js";

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login/>} />
//         <Route path='/HomeAdm' element={<HomeAdm/>} />
//         <Route path='/AddPartners' element={<AddPartners/>} />
//         <Route path='/RecordAsso' element={<RecordAsso/>} />
//       </Routes>
//      </BrowserRouter>
//   );
// }

export default App;
