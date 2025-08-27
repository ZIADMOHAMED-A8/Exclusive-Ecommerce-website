import { createSlice } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";

let initialState={
            jwtToken:localStorage.getItem('token'),
}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken(state,action){
            state.jwtToken=localStorage.getItem('token')
            console.log(`updatedToken${localStorage.getItem('token')}`)
        }
    }
})
export const {setToken}=authSlice.actions;
 export default authSlice.reducer  ;