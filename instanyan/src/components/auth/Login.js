import React, {useState, useEffect} from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/authAction";
import Error from "./Error";
import Logo from '../../assets/images/logo.jpg';

function Login(){
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    
/*     useEffect(()=> {
        if (userInfo) {
            navigate('/profile')
        }
    }, [navigate, userInfo]) */

    const submitForm = (data) => {
        dispatch(userLogin(data))
    }    


    return(
        <div className="flex flex-col h-full p-8 sm:w-auto">
            <div className="flex flex-wrap p-2">
                <div className="flex w-full items-center justify-center">
                    <img className='h-16 w-16' src={Logo} alt='Instanyan'/>
                    <h1 className="font-semibold text-4xl tracking-wider">Instanyan</h1>
                </div>
                <div className="flex w-full mt-6 justify-center text-center">
                    <span className="font-light text-xl">
                        Instanyan is a social media only for cats. Sign-in and join this purrfect place.
                    </span>
                </div>
            </div>
            <div className="flex w-full justify-center mt-12">
                <form className="w-full" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="form-email">E-mail</label>
                    <input className="form-input" type="email" {...register('email')} required></input>
                    <div className="py-1"></div>
                    <label htmlFor="form-password">Password</label>
                    <input className="form-input" type="password" {...register('password')} required></input>
                    <div className="py-1"></div>                    
                    <button className="form-button">Login</button>
                </form>
            </div>    
            {error && <Error>{error}</Error>}        
            <div className="mt-8 flex justify-center">
                <p>Don't have an account?</p>
                <Link to="/register">
                    <p className="ml-1 text-sky-500">Sign-up</p>
                </Link>
            </div>
        </div>
    );
}

export default Login;