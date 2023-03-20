import request from '../utils/request'



export const getSuggestedUsers  = async (page,perPage)=>{
    try{
        const res = await request.get('users/suggested',{
            params :{
                page : page,
                per_page : perPage
            }
        })
        return res.data;
    }catch(er){
        console.log(er)
    }
}

export const getSuggestedUsersAuth  = async (page,perPage,token)=>{
    try{
        const res = await request.get('users/suggested',{
            headers : {
                Authorization : `Bearer ${token}`
            },
            params :{
                page : page,
                per_page : perPage
            }
        })
        return res.data;
    }catch(er){
        console.log(er)
    }
}

export const getFollowingdUsers  = async (page,token)=>{
    try{
        const res = await request.get('me/followings',{
            params :{
                page : page,
            },
            
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        )
        return res.data;
    }catch(er){
        console.log(er)
    }
}

export const getSearchUsers = async (name,type)=>{
    try{
        const res = await request.get('users/search',{
            params :{
                q : name,
                type : type
            }
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}

export const getProfileUser = async (name)=>{
    try{
        const res = await request.get(`users/@${name}`)
        return res.data;
    }catch(error){
        console.log(error)
    }
}


export const loginUser = async (email,password)=>{
    try{
        const res = await  request.post("auth/login",{
            email: email,
            password: password
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}

export const logoutUser = async (token)=>{
    try{
        const res = await  request.post("auth/logout",{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}

export const getAuth = async (token)=>{
    try{
        const res = await  request.get("auth/me",{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}

export const followUser = async (id,token)=>{
    try{
        const res = await  request.post(`users/${id}/follow`,{},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}

export const unfollowUser = async (id,token)=>{
    try{
        const res = await  request.post(`users/${id}/unfollow`,{},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data;
    }catch(error){
        console.log(error)
    }
}
