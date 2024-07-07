import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/not-found/not-found';
import AttributeList from './pages/attribute-list/attribute-list';
import AttributeDetail from './pages/attribute-detail/attribute-detail';
import Home from './pages/home/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/attributes',
    element: <AttributeList />,
  },
  {
    path: '/attributes/:id',
    element: <AttributeDetail />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
