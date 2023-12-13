import React, {useState, useEffect} from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/reduxActions";
import Error from "./Error";
import Logo from '../../assets/images/logo.jpg';

// To-do: função de validar username client side (sem espaços, etc).

function Register(){   
    const {loading, userInfo, error, success } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const [errors, setErrors] = useState({ message: "" })

    useEffect(() => {
        if (success) navigate('/login')
    }, [navigate, success])

    function validate(userdata) {
        let errorMessage = "";        
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userdata.email))){
            errorMessage = "Incorrect e-mail."
        }else if (userdata.password.length < 6){
            errorMessage = "Password must be at least 7 characters long."
        }else if (userdata.password !== userdata.confirmPassword){
            errorMessage = "Passwords don't match."
        }
        setErrors({message: errorMessage});
        if (errors.message === ""){
            return true
        }else{
            return false;
        }
    };

    const submitForm = (data) => {
        // client-validate mail and password
        if (validate(data)){
            data.email = data.email.toLowerCase();
            dispatch(registerUser(data));
        }
    };

    return(
        <div className="flex flex-col h-full p-8 sm:w-auto">
            <div className="flex flex-wrap p-2">
                <div className="flex w-full items-center justify-center">
                    <img className='h-16 w-16' src={Logo} alt='Instanyan'/>
                    <h1 className="font-semibold text-4xl tracking-wider">Instanyan</h1>
                </div>
                <div className="flex w-full mt-6 justify-center text-center">
                    <span className="font-light text-xl">
                        Create your account and connect with hundreds of kittens!
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-center mt-12">
                <form className="" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="form-email">E-mail</label>
                    <input className="form-input" type="email" {...register('email')} required></input>
                    <div className="py-1"></div>
                    <label htmlFor="form-name">Name</label>
                    <input className="form-input" type="text" {...register('name')} required></input>
                    <div className="py-1"></div>
                    <label htmlFor="form-username">Username</label>
                    <input className="form-input" type="text" {...register('username')} required></input>
                    <div className="py-1"></div>
                    <label htmlFor="form-password">Password</label>
                    <input className="form-input" type="password" {...register('password')} required></input>
                    <div className="py-1"></div>
                    <label htmlFor="form-confirmPassword">Confirm Password</label>
                    <input className="form-input" type="password" {...register('confirmPassword')} required></input>                                                                           
                    <button className="form-button" type='submit'>Sign-up</button>
                </form>
            </div>
            {error && <Error>{error}</Error>}    
            {errors.message && <Error>{errors.message}</Error>}        
            <div className="mt-8 flex justify-center">
                <p>Have an account?</p>
                <Link to="/login">
                    <p className="ml-1 text-sky-500">Sign-in</p>
                </Link>
            </div>
        </div>
    );
}

export default Register;