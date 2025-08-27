import {createSlice} from '@reduxjs/toolkit'
import { useCheckLoggedInQuery } from './authApiSlice';

let initialState={user:null,token:null,loogedin:null,loading:true}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredintials(state,action){
            const {user,accessToken,loogedin}=action.payload
            state.user=user;
            state.token=accessToken
            state.loogedin=loogedin
            console.log(action.payload)
        },
        setLoggedin(state,action){
            state.loogedin=action.payload
            state.loading=false
        },
        logOut(state,action){
            state.user=null
            state.token=null
            console.log(state.token)
            state.loogedin=false
        },

    }
})
export const {setCredintials,logOut,setLoggedin}=authSlice.actions
export default authSlice.reducer

export const selectCurrentUser=(state)=>state.auth.user
export const selectCurrentToken=(state)=>state.auth.token
export function useAuth(){
    let {data}=useCheckLoggedInQuery();
    dispatchEvent(setLoggedin(data))
}