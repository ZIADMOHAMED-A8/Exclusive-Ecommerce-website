import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { logOut, setCredintials, setLoggedin } from './authSlice'
const baseQuery=fetchBaseQuery({
    baseUrl:'https://dummy-backend-blond.vercel.app/',
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token=getState().auth.token
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQuerywithReauth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions)
    console.log(result)
    if(result?.error?.status===403){
        console.log('sending refresh token')
        let refreshResult=await baseQuery('/refresh',api,extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            const user=api.getState().auth.user
            api.dispatch(setCredintials({user:user,accessToken:{...refreshResult.data}}))
        result=await baseQuery(args,api,extraOptions)

        }
        else{
            api.dispatch(setLoggedin(false))
        }
    }
    return result
}
export const apiSlice=createApi({
    baseQuery:baseQuerywithReauth,
    endpoints:builder=>({})

})
