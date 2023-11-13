import * as yup from 'yup';

let loginSchema=yup.object().shape({
    username:yup.string().min(5).max(30).required("Username is required"),
    password:yup.string().min(6).max(30).required("Password is required")
})
export default loginSchema;