import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';

let store=configureStore({
    reducer:{
        User:user
    }
})
export default store;