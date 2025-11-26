import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import Viewstory from './Viewstory'
import './index.css'
import Profile from './Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/story/:id/:tot',
    element: <Viewstory />
  },
  {
    path: '/profile',
    element: <Profile />
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
