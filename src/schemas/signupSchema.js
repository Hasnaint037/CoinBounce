import * as yup from 'yup';

let signupSchema=yup.object().shape({

    name:yup.string().max(30).required("name is required"),
    username:yup.string().min(5).max(30).required("username is required"),
    email:yup.string().email().required("email is required"),
    password:yup.string().min(6).required("password is required"),
    confirmpassword:yup.string().oneOf([yup.ref('password')],'password does not match').required("password is required")

})
export default signupSchema;