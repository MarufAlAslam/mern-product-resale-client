import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Blogs from './Pages/Blogs/Blogs';
import Broken from './Pages/Broken/Broken';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Main from './Pages/Main/Main';
import Products from './Pages/Products/Products';
import Register from './Pages/Register/Register';

function App() {
  // routes will be here

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: 'blogs',
          element: <Blogs></Blogs>
        },
        {
          path: 'products',
          element: <Products></Products>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: '*',
          element: <Broken></Broken>,
        }
      ]
    }
  ])




  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
