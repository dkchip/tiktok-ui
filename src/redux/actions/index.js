import { LOGIN_USER,LOGOUT_USER } from "../constants";

export const setUser = (payload)=>{
    return {
        type : LOGIN_USER,
        payload
    }
}

export const deleteUser = (payload)=>{
    return {
        type : LOGOUT_USER,
        payload
    }
}