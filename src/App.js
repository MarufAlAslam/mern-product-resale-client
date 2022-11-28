import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddProduct from './Pages/AddProduct/AddProduct';
import Blogs from './Pages/Blogs/Blogs';
import Broken from './Pages/Broken/Broken';
import AllBuyers from './Pages/Dashboard/AllBuyers/AllBuyers';
import AllSellers from './Pages/Dashboard/AllSellers/AllSellers';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyBuyers from './Pages/Dashboard/MyBuyers/MyBuyers';
import Payment from './Pages/Dashboard/Payment/Payment';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import CategoryDetails from './Pages/Home/Categories/CategoryDetails/CategoryDetails';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Main from './Pages/Main/Main';
import CategoriedCard from './Pages/Products/CategoriedCard/CategoriedCard';
import ProductDetails from './Pages/Products/ProductDetails/ProductDetails';
import Products from './Pages/Products/Products';
import Register from './Pages/Register/Register';
import PrivateRoute from './Utils/Routes/PrivateRoute';

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
          path: '/README.mdblogs',
          element: <Blogs></Blogs>
        },
        {
          path: '/products',
          element: <Products></Products>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/blogs',
          element: <Blogs></Blogs>
        },
        {
          path: 'product-datails/:id',
          element: <ProductDetails></ProductDetails>
        },
        {
          path: '/category/:id',
          element: <PrivateRoute><CategoryDetails></CategoryDetails></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
        },
        {
          path: '*',
          element: <Broken></Broken>,
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        },
        {
          path: `/dashboard/add-product`,
          element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
        },
        {
          path: `/dashboard/my-buyers`,
          element: <PrivateRoute><MyBuyers></MyBuyers></PrivateRoute>,
        },
        {
          path: '/dashboard/all-sellers',
          element: <PrivateRoute><AllSellers></AllSellers></PrivateRoute>,
        },
        {
          path: '/dashboard/all-buyers',
          element: <PrivateRoute><AllBuyers></AllBuyers></PrivateRoute>,
        },
        {
          path: '/dashboard/payment/:id',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>
        }
      ]
    }
  ])




  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
