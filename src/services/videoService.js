import request from '../utils/request';

export const getComments = async (key, comments = 'comments') => {
    try {
        const res = await request.get(`videos/${key}/${comments}`, {
            headers: { 
                'Content-Type': 'application/json' ,
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3NzQzMzY5MiwiZXhwIjoxNjgwMDI1NjkyLCJuYmYiOjE2Nzc0MzM2OTIsImp0aSI6Ijk4dUw5cWJmRDdXVTlLVnoiLCJzdWIiOjUxODQsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.gEtKvtP6CB5TsPrXwT0F-wA29pmt44DIocuGW86KAB4`,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

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


