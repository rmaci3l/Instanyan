import React, {useState} from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authAction";
import Logo from '../../assets/images/logo.jpg';

// To-do: função de validar username client side (sem espaços, etc).

function Register(){   
    const {loading, userInfo, error, success } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [errors, setErrors] = useState({})

    function validate(userdata) {
        let tempErrors = {};
        tempErrors.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userdata.email)) ? "" : "Email is not valid.";
        tempErrors.password = (userdata.password.length > 6) ? "" : "Password must be at least 7 characters long.";
        tempErrors.confirmPassword = (userdata.password === userdata.confirmPassword) ? "" : "Confirm your password."
        setErrors(tempErrors);
        console.log(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };


    const submitForm = (data) => {
        // client-validate mail and password
        console.log(validate(data));
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
                    <button className="form-button">Sign-up</button>
                </form>
            </div>            
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