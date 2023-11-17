import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, refreshTokenAndSetCredentials, selectCurrentToken } from "./authSlice";
import React, { useEffect } from 'react';

const RequireAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken)
  const isAuth = useSelector(isAuthenticated)

  useEffect(() => {
    dispatch(refreshTokenAndSetCredentials())
  }, [dispatch])

  return (
    isAuth ?
      <Outlet />
      : <Navigate to='/' />
  );
}

export default RequireAuth;
