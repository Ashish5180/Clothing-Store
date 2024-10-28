import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Store from './components/Product-Store/Store.jsx';
import Contact from './components/Pages/Contact.jsx';
import Home from './components/Pages/Home.jsx';
import Signup from './components/Authentication/Signup';
import Signin from './components/Authentication/Signin';
import Cart from './components/cart/Cart.jsx';
import Dashboard from './components/customer-desk/Dashboard.jsx';
import  About  from './components/Pages/AboutUs.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/cart/Redux/store.js';
import Account from './components/customer-desk/routes/Account.jsx';
import Address from './components/customer-desk/routes/Address.jsx';
import Order from './components/customer-desk/routes/Order.jsx';
import Protected from './components/protected.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'Contact', element: <Contact /> },
      { path: 'Store', element: <Store /> },
      { path: 'Signup', element: <Signup/> },
      { path: 'Signin', element: <Signin /> },
      { path: 'cart', element: <Cart /> },


      { path: 'dashboard',
         element: <Dashboard/>,
        children: [
          { path: 'Account', element: <Account/> },
          { path: 'Address', element: <Address/> },
          { path: 'Order', element: <Order/> },
        ]},
      
      { path: 'about', element: <About/> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <RouterProvider router={router} />
   </PersistGate>
   </Provider>
   
  </StrictMode>,
)
