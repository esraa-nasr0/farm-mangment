import axios from "axios";
import React , { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";


export default function Login() {

    let {setAuthorization} = useContext(UserContext);

    let navigate = useNavigate();
    const [error ,setError] = useState(null);
    const [isLoading , setisLoading] = useState(false);

    async function submitLogin(value) {
        setisLoading(true);

        let {data } = await axios.post(`https://farm-project-bbzj.onrender.com/api/login`, value)
        .catch((err)=>{
        setisLoading(false);
        setError(err.response.data.message)
        // console.log(err.response.data.message)
        })
        if(data.status === "success" ){
        setisLoading(false);
        localStorage.setItem('Authorization', data.data.token);
        // console.log(data.data.token);
        setAuthorization(data.data.token)
        navigate('/')
        }
    }

    let validation = Yup.object({
        email:Yup.string().email('email is invaled').required('email is required'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    })

    let formik = useFormik({
    initialValues:{
        email:'',
        password:'',
    },validationSchema:validation,
    onSubmit:submitLogin
    })




    return <>
    <div className="body">
    <div className="container2">
        <div className="title">Login</div>
        <p className="text-danger">{error}</p>
    <form onSubmit={formik.handleSubmit}>
        <div className="user-detail">
        <div className="input-box2">
            <label className="label" htmlFor="email">Email</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} placeholder="Enter your email" id="email" type="text" className="input" name="email"/>
            {formik.errors.email && formik.touched.email?<p className="text-danger">{formik.errors.email}</p>:""}
        </div>


        <div className="input-box2">
            <label className="label" htmlFor="password">Password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder="Enter your password" id="password" type="password" className="input" name="password"/>
            {formik.errors.password && formik.touched.password?<p className="text-danger">{formik.errors.password}</p>:""}
        </div>
        </div>

        <div className="divbutton">
        {isLoading?
        <button  type="button" className="button">
        <i className="fas fa-spinner fa-spin"></i>
        </button>:<>
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="button">Submit</button>
        <Link className='btn' to={'/register'}>Register New</Link>
        </>}
        </div>
        </form>
        
        </div>
        </div>
    </>
}