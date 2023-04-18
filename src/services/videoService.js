import request from '../utils/request';

export const getComments = async (key, comments = 'comments',token) => {
    try {
        const res = await request.get(`videos/${key}/${comments}`, {
            headers: { 
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

export const createComment = async (key, comments = 'comments',token,value)=>{
    try {
        const res = await request.post(`videos/${key}/${comments}`,
        { 
            comment : value,
        }, 
        {
            headers: { 
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
}


export const deleteComment = async (key,token,comment)=>{
    try {
        const res = await request.delete(`comments/${key}`,
        {
            headers: { 
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
            params :{
                comment : comment
            }
        });

        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getVideos = async (page,type)=>{
    try{
        const res = await request.get("videos",{
            params :{
                type : type,
                page : page
            }
        })
        return res;
    }catch(e){
        console.log(e)
    }
}

export const getVideosAuth = async (page,type,token)=>{
    try{
        const res = await request.get("videos",{
            headers :{
                Authorization : `Bearer ${token}`
            },
            params :{
                type : type,
                page : page
            }
        })
        return res;
    }catch(e){
        console.log(e)
    }
}


export const getAnVideoAuth = async (uuid,token)=>{
    try{
        const res = await request.get(`videos/${uuid}`,{
            headers : {
                Authorization  : ` Breaer ${token}`
            }
        })
        return res;
    }catch(e){
        console.log(e)
    }
}



export const likeVideos = async (idVideo,token)=>{
    try{
        const res = await request.post(`videos/${idVideo}/like`,{},{
            headers :{
                Authorization : `Bearer ${token}`
            }
           
        })
        return res;
    }catch(e){
        console.log(e)
    }
}

export const unLikeVideos = async (idVideo,token)=>{
    try{
        const res = await request.post(`videos/${idVideo}/unlike`,{},{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        return res;
    }catch(e){
        console.log(e)
    }
}


