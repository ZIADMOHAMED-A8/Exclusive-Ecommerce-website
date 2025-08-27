import { apiSlice } from "./apiSlice";
import { setCredintials } from "./authSlice";
import {setLoggedin} from './authSlice'
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: Credentials => ({  
        url: '/auth/login',
        method: 'POST',
        body: { ...Credentials },
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setLoggedin(true));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

 

    checkLoggedIn: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"], 
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
                    dispatch(setLoggedin(false));

        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
    signup:builder.mutation({
      query:(credentials)=>({
        url:'/auth/signup',
        method:'POST',
        body:{...credentials},
        credentials:'include'
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckLoggedInQuery,
  useLogoutMutation,
  useSignupMutation
} = authApiSlice;
