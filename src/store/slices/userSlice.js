import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState :{
        currentUser: {},
        auth: false,
        otherUser :{

        }
    },
    reducers :{
        setUser :(state,actions) =>{
            return {
                ...state,
                currentUser :{
                    ...actions.payload
                },
                auth : true
            }
        },
        deleteUser :(state,actions) =>{
            return {
                ...state,
                currentUser :{
                    ...actions.payload
                },
                auth: false
            }
        },
        setOtherUser : (state,actions)=>{
            return {
                ...state,
                otherUser : {
                    ...actions.payload
                }
            }
        }
    }
})

export const {setUser,deleteUser,setOtherUser} = userSlice.actions;
export default userSlice.reducer