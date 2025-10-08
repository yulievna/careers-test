import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CareersPage from '../pages/CareersPage/CareersPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CareersPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
]);
