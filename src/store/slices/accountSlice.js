import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account',
    initialState :{
        dataAccounts :[],
        dataAccountsPreview : []
    },
    reducers :{
        setAccount : (state,action)=>{
            return {
                ...state,
                dataAccounts : [...state.dataAccounts,...action.payload]
            }
        },
        updateAccount : (state,action)=>{
            return {
                ...state,
                dataAccounts :[...action.payload]
            }
        },
        setAccountPreview : (state,action)=>{
            return {
                ...state,
                dataAccountsPreview : [...action.payload]
            }
        }
    }
})

export const {setAccount,updateAccount,setAccountPreview} = accountSlice.actions;
export default accountSlice.reducer;