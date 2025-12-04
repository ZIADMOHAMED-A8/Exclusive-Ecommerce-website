
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Cartpage from './components/Cartpage';
import Rootlayout from './components/rootlayout';
import Homepage from './components/Homepage';
import Productpage from "./components/Productpage";
import { fetchProducts } from "./components/products-slice";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsPage from "./components/ProductsPage";
import ProductsByCategory from "./components/Productsbycategory";
import Aboutpage from "./components/Aboutpage";
import CheckoutPage from "./components/CheckoutPage";
import AuthenticationPage from "./components/AutenticationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { setLoggedin, useAuth } from "../auth/authSlice";
import { useCheckLoggedInQuery } from "../auth/authApiSlice";
import LoadingSpinner from "./components/LoadingSpinner";
function App() {
    let dispatch=useDispatch()
    let {items:data,error,loading}=useSelector((state)=>state.product)
  let {data:isin,isLoading}=useCheckLoggedInQuery()
  useEffect(() => {
    document.querySelectorAll('img:not([loading])')
      .forEach(img => img.setAttribute('loading', 'lazy'));
  }, []);


  
    useLayoutEffect(()=>{
             if(!isLoading){
               dispatch(setLoggedin(isin))
             }
  },[isin,isLoading])    

    
  useEffect(() => {
         
        console.log('triggered')
        dispatch(fetchProducts());
          
        
    }, []);

  let router=createBrowserRouter([
    {path:'',
      element:<Rootlayout></Rootlayout>,
      children:[
        {index:true,
          element:<Homepage></Homepage>
        },
        {
          path:'cart',
          element:<ProtectedRoute>
            <Cartpage></Cartpage>
          </ProtectedRoute>
        },
        {
          path:'/:productId',
          element:<Productpage></Productpage>
        },
        {
          path:'products',
          element:<ProductsPage></ProductsPage>
        }
        ,{
          path:'/products/:productsCategory',
          element:<ProductsByCategory></ProductsByCategory>
        },
        {
          path:'/about',
          element:<Aboutpage></Aboutpage>
        },
        {
          path:'cart/checkout',
          element:<ProtectedRoute>
            <CheckoutPage></CheckoutPage>
          </ProtectedRoute>
        },
        {
          path:'/auth',
          element:<AuthenticationPage></AuthenticationPage>,
          // action:authaction
        }
      ]
    }
  ])

  return (
    <>
      {isLoading ? <LoadingSpinner></LoadingSpinner> :<RouterProvider router={router}></RouterProvider>}
    </>
  )
}

export default App
