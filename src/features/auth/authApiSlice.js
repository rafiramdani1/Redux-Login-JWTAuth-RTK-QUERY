import { useDispatch } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    getRefreshToken: builder.query({
      query: () => '/auth/token',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE'
      })
    })
  })
})

export const {
  useLoginMutation,
  useGetRefreshTokenQuery,
  useLogoutMutation
} = authApiSlice