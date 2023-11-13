import { createSlice } from '@reduxjs/toolkit';

let initialState={
    _id:'',
    email:'',
    username:'',
    auth:false
}

export let userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            let {_id,email,username,auth}=action.payload;
            state._id=_id;
            state.email=email;
            state.username=username;
            state.auth=auth;
        },
        resetUser(state,action){
            state._id='';
            state.email='';
            state.username='';
            state.auth=false;
        }
    }
})

export const {setUser,resetUser}=userSlice.actions;
export default userSlice.reducer;