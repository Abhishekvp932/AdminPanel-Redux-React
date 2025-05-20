
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token:null,
    isLoggedIn:false,

}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
            
        },
        logoutUser(state){
            state.user = null
            state.token = null
            state.isLoggedIn = false
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer