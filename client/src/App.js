import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import './App1.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './assets/components/Auth/Signup';
import Login from './assets/components/Auth/Login';
import Portal from './assets/components/Portal';
import Allproduct from './assets/components/Product/Allproduct';
import Createproduct from './assets/components/Product/Createproduct';
import Viewproduct from './assets/components/Product/Viewproduct';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Basic Auth components */}
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />

          {/* Main portal home components */}
          <Route path='/portal' element={<Portal />}>
            <Route index element={<Allproduct />} />
            <Route path='/portal/createproduct' element={<Createproduct />} />
            <Route path='/portal/editproduct/:id' element={<Viewproduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
