import React from "react";
import { Link, Outlet } from 'react-router-dom'
import { Officer } from "../assets";

const Unauthorized = () => {
    return(
        <div className="flex flex-col w-full items-center justify-center">       
            <div className="flex flex-col w-4/5 sm:w-3/4 mt-10 text-center items-center">
                <img className="rounded-full ring-4 ring-indigo-500 p-2 w-fit sm:h-[380px]" src={Officer} />
                <h1 className="text-white-light font-bold text-3xl tracking-wider mt-8">Stop right there!</h1>
                <span className="text-white-medium font-light text-lg text-center p-4">It seems you are trying to access a page you are not supposed to. Perhaps you should log-in!</span>
                <span className="text-white-light font-light text-lg text-center p-4"> You can <Link to='/login' className="text-indigo-500">log-in</Link> or <Link to="/register" className="text-indigo-500">create a new account</Link>.</span>
            </div>
        </div>
    );   
}

export default Unauthorized;