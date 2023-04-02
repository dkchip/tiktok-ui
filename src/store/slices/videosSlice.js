import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
    name: 'videos',
    initialState :{
        dataAllVideos : [],
        dataAllVideosFollowing : [],
        dataAllVideosUser : [],
    },
    reducers : {
        setvideos :(state,action)=>{

            return {
                ...state,
                dataAllVideos :[...state.dataAllVideos , ...action.payload]
            }
        },
        updateVideo : (state,action)=>{
            return {
                ...state,
                dataAllVideos : [...action.payload]
            }
        },
        setVideosFollowing : (state,action)=>{
            return {
                ...state,
                dataAllVideosFollowing : [...state.dataAllVideosFollowing , ...action.payload]
            }
        },
        updateVideoFollowing :(state,action)=>{
            return {
                ...state,
                dataAllVideosFollowing :[...action.payload]
            }
        },
        setVideosUser : (state,action)=>{
            return{
                ...state,
                dataAllVideosUser :[...action.payload]
            }
        }
    }

})

export const {setvideos,updateVideo,setVideosFollowing,updateVideoFollowing,setVideosUser} = videosSlice.actions; 

export default videosSlice.reducer;