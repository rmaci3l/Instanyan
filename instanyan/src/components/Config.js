import React from "react";
import { configLinks } from "../constants";
import {Navbar, MobNav} from './'
import { Link } from "react-router-dom";

function ConfigPage(){
    return(
        <div className='flex h-screen sm:flex-row flex-col w-full sm:w-2/3'>
            <Navbar />
            <div className="flex flex-col sm:w-full">
                <div className="flex w-full flex-col">
                    <div className="bg-stone-900">
                        <h1 className="p-4 text-lg">Account</h1>
                    </div>
                    <div className="font-light text-stone-300">
                        {configLinks.filter(opt => opt.type === "account").map((opt) =>(
                            <div key={opt.id} className="py-2 px-4 border-y border-gray-600">
                                <Link to={`${opt.path}`}>
                                    <p>{opt.id}</p>
                                </Link>
                            </div>
                        ))}
                    </div>                
                </div>
                <div className="flex w-full flex-col">
                    <div className="bg-stone-900">
                        <h1 className="p-4 text-lg">About</h1>
                    </div>
                    <div className="font-light text-stone-300">
                        {configLinks.filter(opt => opt.type === "company").map((opt) =>(
                            <div key={opt.id} className="py-2 px-4 border-y border-gray-600">
                                <Link to={`${opt.path}`}>
                                    <p>{opt.id}</p>
                                </Link>
                            </div>
                        ))}
                    </div>                
                </div>
            </div>
            <MobNav />
        </div>
    );
}

export default ConfigPage