import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Protectected({ children }) {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <h2 className=" text-4xl fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-yellow-300 font-medium text-white">Loading...</h2>;
  }
  if(!user){
    return <Navigate to={'/login'} replace/>
  }
  return children;
}

export default Protectected;
