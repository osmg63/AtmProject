import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ViewMap from './pages/ViewMap';
import AtmDetail from './pages/AtmDetail';
import CreateAtm from './pages/CreateAtm';
import NotFoundPage from './pages/NotFoundPage';
import AtmUpdate from './pages/AtmUpdate';
import MyFilter from './pages/MyFilter';
import I18n from './pages/i18n';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MyFilter />,
  },
  {
    path: '/ViewMap',
    element: <ViewMap />,
  },
  {
    path: '/AtmDetail/:id',
    element: <AtmDetail />,
  },
  {
    path: '/AtmUpdate/:id',
    element: <AtmUpdate />,
  },
  {
    path: '/CreateAtm',
    element: <CreateAtm />,
  },
  {
    path: '/Filter',
    element: <MyFilter />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
