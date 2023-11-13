import {Navigate} from 'react-router-dom';
let Protected=({isAuth,children})=>{
    if(isAuth){
        return children;
    }else{
       return <Navigate to='/login'></Navigate>
    }
}
export default Protected;