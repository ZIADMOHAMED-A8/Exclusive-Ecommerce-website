// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


export default function ProtectedRoute({ children }) {
  let token=useSelector((state)=>state.auth.loogedin)
  let loading=useSelector((state)=>state.auth.loading)
  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }  
  

  if (!token) {
   console.log('vd')
    return <Navigate to="/auth/?mode=login" replace />;
  }

  return children;
}
