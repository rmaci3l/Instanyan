import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/reduxActions";
import { Button, Label, TextInput } from 'flowbite-react'
import { HiMail, HiLockClosed } from 'react-icons/hi';
import AuthHeader from "./AuthHeader";
import { Loading, AlertPopup } from "../utils";


function Login() {
    const { userInfo, userToken, error, success, loading } = useSelector((state) => state.auth)
    let navigate = useNavigate();
    const [ formError, setFormError ] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    
    useEffect(() => {
        if (userToken !== null && userToken !== "undefined") navigate('/')
        }, [navigate, userInfo, userToken, success])
      
    const submitForm = (data) => {
        dispatch(userLogin(data))
    }  
    
    useEffect(() => {
      setFormError(error);
    }, [error])
    

    // Clear errors after 4 seconds.
    useEffect(() => {
        let timer
            if (formError) {
            timer = setTimeout(() => {
                setFormError('');
            }, 4000);  
        }
        return () => {
        if (timer) clearTimeout(timer);
        };
    }, [formError]);


    return(
        <div className="flex h-screen w-full">
            <div className="flex flex-col p-6 sm:justify-center sm:w-1/3 sm:bg-grey-heavy">
                <AuthHeader sub={"Instanyan is a social media only for cats. Sign-in and join this purrfect place."} />
                <div className="w-full">
                    <form className="flex flex-col form-style" onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="form-email" value="E-mail" />
                            </div>
                            <TextInput type="email" rightIcon={HiMail}  {...register('email')} placeholder="youremail@domain.com" required />
                        </div>
                        <div>
                            <div className="mb-1 block">
                                <Label htmlFor="" value="Password" />    
                            </div>                    
                            <TextInput type="password" rightIcon={HiLockClosed}  {...register('password')} required />
                        </div>
                        <Button type="submit" size="md">Login</Button>
                    </form>
                    <div className="mt-8 flex justify-center">
                        <span>Don't have an account?</span>
                        <Link className="ml-1 indigo-link" to="/register">
                            Sign-up!
                        </Link>                         
                    </div>     
                    {loading && 
                        <div className="fixed top-0 right-0 w-full h-screen bg-grey-heavy bg-opacity-70">
                            <Loading />
                        </div>
                    }                    
                </div>                   
            </div>          
            {formError && <AlertPopup error={formError} />}
        </div>
    );
}

export default Login;