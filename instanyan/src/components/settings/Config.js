import React, {useEffect, useState} from "react";
import { configLinks } from "../../constants";
import { Link } from "react-router-dom";
import { Routes, Route, useLocation, Switch } from 'react-router-dom';
import {About, Activity, EditProfile, Help, Issue, Language, Notifications} from '.'
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function ConfigSection({type}) {
    return(
        <div className="flex w-full flex-col">
            <div className="bg-stone-900">
                <h1 className="p-4 text-lg capitalize">{type}</h1>
            </div>
            <div className="font-light text-stone-300">
                {configLinks.filter(opt => opt.type === type).map((opt) =>(
                    <div key={opt.id} className="py-2 px-4 border-y border-gray-600">
                        <Link to={`/settings/${opt.path}`}>
                            <p>{opt.id}</p>
                        </Link>
                    </div>
                ))}
            </div>                
        </div>  
    );
}

function ConfigPage(){
    const [classSettings, setClassSettings] = useState('block')
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout());
    };

    return(       
        <div className='flex sm:flex-row flex-col w-full'>
            <div className={`flex flex-col sm:w-1/5 sm:border-r sm:border-gray-600`}>
                <div className={classSettings}>
                    <ConfigSection type="account" />
                    <ConfigSection type="company" />
                    <div className="text-red-400 py-2 px-4 border-y border-gray-600">
                        <button onClick={handleLogout}>Log-out</button>
                    </div>
                </div>
             </div>
            <div className="sm:flex sm:flex-grow">
                <Routes>
                    <Route path="/edit" element={<EditProfile setClassSettings={setClassSettings} />}></Route>
                    <Route path="/language" element={<Language setClassSettings={setClassSettings} />}></Route>
                    <Route path="/activity" element={<Activity setClassSettings={setClassSettings} />}></Route>
                    <Route path="/notifications" element={<Notifications setClassSettings={setClassSettings} />}></Route>
                    <Route path="/about" element={<About setClassSettings={setClassSettings} />}></Route>
                    <Route path="/help" element={<Help setClassSettings={setClassSettings} />}></Route>
                    <Route path="/report" element={<Issue setClassSettings={setClassSettings} />}></Route>
                </Routes>           
            </div>
        </div>
    );
}

export default ConfigPage