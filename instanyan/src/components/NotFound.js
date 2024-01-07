import React from "react";
import { Link } from 'react-router-dom'
import { Detective } from "../assets";

const NotFound = () => {
    return(
        <div className="flex flex-col w-full items-center justify-center">       
            <div className="flex flex-col w-4/5 sm:w-3/4 mt-10 text-center items-center">
                <img className="rounded-full ring-4 ring-indigo-500 p-2 w-fit sm:h-[380px]" src={Detective} alt="Cat detective"/>
                <h1 className="text-white-light font-bold text-3xl tracking-wider mt-8">Oops... Not Found!</h1>
                <span className="text-white-medium font-light text-lg text-center p-4">It seems we didn't find the page you've requested. But fear not, our cat-detective is already trying to find it.</span>
                <span className="text-white-light font-light text-lg text-center p-4"> You can return to <Link to='/' className="text-indigo-500">home</Link> until then.</span>
            </div>
        </div>
    );   
}

export default NotFound;