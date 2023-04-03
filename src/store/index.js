import {configureStore, combineReducers} from "@reduxjs/toolkit"
import videosSlice from "./slices/videosSlice";
import userSlice from "./slices/userSlice";
import accountSlice from "./slices/accountSlice";
import commentsSlice from "./slices/commentsSlice";

const store = configureStore({
    reducer  :{
        videos : videosSlice,
        user : userSlice,
        accounts : accountSlice,
        comments : commentsSlice
    }
})

export default store;