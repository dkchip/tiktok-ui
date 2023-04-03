import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: 'comments',
    initialState :{
        dataComments : []
    },
    reducers :{
        setCommnets : (state,action) =>{
          
            return {
                ...state,
                dataComments : [ {...action.payload} ,...state.dataComments ]
            }
        },
        updateCommnets : (state,actions)=>{
            return {
                ...state,
                dataComments : [...actions.payload]
            }
        }
    }
    
})

export const {setCommnets,updateCommnets} = commentsSlice.actions;
export default commentsSlice.reducer;