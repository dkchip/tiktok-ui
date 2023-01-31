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