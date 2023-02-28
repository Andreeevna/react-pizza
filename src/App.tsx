import React, { Suspense } from 'react';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
