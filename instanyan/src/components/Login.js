import React from "react";
import Logo from '../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

function Login(){
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
                <form className="">
                    <label className="">Username</label>
                    <input className="w-full p-1 rounded" id="username" type="text" value=""></input>
                    <div className="py-2"></div>
                    <label className="" htmlFor="password">Password</label>
                    <input className="w-full p-1 rounded" id="password" type="password"></input>

                    <button className="mt-6 p-2 rounded-md w-full bg-gradient-to-r from-cyan-500 to-blue-500">Login</button>
                </form>
            </div>            
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