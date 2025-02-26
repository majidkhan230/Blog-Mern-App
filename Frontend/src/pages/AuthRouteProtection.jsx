import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AuthRouteProtection() {
  const user = useSelector((state)=>state.user)
  console.log(user)
  if(user && user.isLoggedIn){
    return <Outlet/>
  }
  else {
    return <Navigate to={'sign-in'} />
  }
  
}

export default AuthRouteProtection