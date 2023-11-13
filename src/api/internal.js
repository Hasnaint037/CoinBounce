import axios from 'axios';

let api=axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})
// for login
export let login=async (data)=>{
    let response;
    try{
        response=await api.post('/login',data);
    }catch(error){
        return error;
    }
    return response;
}

// for sign up
export let signup=async (data)=>{
    let response;
    try{
        response=await api.post('/signup',data);
    }
    catch(error){
        return error;
    }
    return response;
}

// for log out
export let logout=async()=>{
    let response;
    try{
        response=await api.post('/logout')
    }catch(error){
        return error;
    }
    return response;
}

export let getBlogs=async ()=>{
    let response;
    try{
        response=await api.post('/all');
    }catch(error){
        return error;
    }
    return response;
}

export let createBlog=async (data)=>{
    let response;
    try{
        response=await api.post('/create',data);
    }catch(error){
        return error;
    }
    return response;
}

export let getBlogById=async (id)=>{
    let response;
    try{
        response=await api.post(`/all/${id}`);
    }
    catch(error){
        return error;
    }
    return response;
}

export let getCommentById=async (id)=>{
    let response;
    try{
        response=await api.get(`/comment/${id}`);
    }
    catch(error){
        return error;
    }
    return response;
}

export let deleteBlogById=async (id)=>{
    let response;
    try {
        response=await api.delete(`/delete/${id}`)
    }
     catch (error) {
        return error;
    }
    return response;
}

export let postComment=async (data)=>{
    let response;
    try{
        response=await api.post('/comment',data);
    }
    catch(error){
        return error;
    }
    return response;
}

export let updateBlog=async(data)=>{
    let response;
    try{
        response=await api.put('/update',data);
    }
    catch(error){
        return error;
    }
    return response;
}