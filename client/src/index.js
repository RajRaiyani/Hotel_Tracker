import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from "./pages/App"
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/LogIn";
import Signin from "./pages/Authentication/SignIn";
import OwnerLogIn from './pages/Owner/OwnerComponents/OwnerLogIn';

import WaiterTable from './pages/Waiter/WaiterTable';

import OwnerApp from './pages/Owner/OwnerApp';
import DashBoard from './pages/Owner/OwnerPages/DashBoard';
import OwnerTable from './pages/Owner/OwnerPages/Table';
import OwnerItem from './pages/Owner/OwnerPages/Item';
import TablePage from './pages/Owner/OwnerPages/TablePage';

import Waiter from './pages/Waiter/Waiter';
import Chef from './pages/Chef/Chef';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/waiter",
        children:[
          {
            path:"",
            element:<Waiter />
          },
          {
            path:"table/:id",
            element:<WaiterTable />
          }
        ]
      },
      {
        path:"/chef",
        element:<Chef />
      }
    ]
  },
  {
    path:"/login",
    element:<Login />,
  },
  {
    path:"/signin",
    element:<Signin />
  },
  {
    path:"/owner",
    element:<OwnerApp />,
    children:[
      {
        path:"",
        element:<DashBoard />
      },
      {
        path:"table",
        element:<OwnerTable />
      },
      {
        path:"item",
        element:<OwnerItem />
      },
      {
        path:"table/:id",
        element:<TablePage />
      }
    ]
  },
  {
    path:"/ownerlogin",
    element:<OwnerLogIn />
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}/>
);