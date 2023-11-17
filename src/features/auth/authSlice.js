import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { jwtDecode } from "jwt-decode";

const authLocalStorage = localStorage.getItem('isAuth')

export const refreshTokenAndSetCredentials = () => async (dispatch, getState) => {
  try {
    const response = await dispatch(apiSlice.endpoints.getRefreshToken.initiate())
    if (response.isSuccess) {
      const user = getState().auth.user
      await dispatch(setCredentials(response.data))
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuth: authLocalStorage ? authLocalStorage : null
  },
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('isAuth', true)
      state.isAuth = true
      state.token = action.payload.accessToken
      const decodeUser = jwtDecode(action.payload.accessToken)
      if (decodeUser) {
        state.user = decodeUser
      }
    },
    setLogOut: (state, action) => {
      localStorage.removeItem('isAuth')
      state.isAuth = null
      state.token = null
      state.user = null
    }
  },
})

export const { setCredentials, setLogOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const isAuthenticated = (state) => state.auth.isAuth