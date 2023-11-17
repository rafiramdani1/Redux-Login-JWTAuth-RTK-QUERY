import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { isAuthenticated, setLogOut } from '../features/auth/authSlice'
import { useEffect } from 'react'
import { useLogoutMutation } from '../features/auth/authApiSlice'

const Layout = () => {

  const isAuth = useSelector(isAuthenticated)
  const dispatch = useDispatch()
  const [logout, { isLoading }] = useLogoutMutation()

  useEffect(() => {
    if (isAuth !== 'true') {
      try {
        logout()
        dispatch(setLogOut())
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return <Outlet />;
}

export default Layout