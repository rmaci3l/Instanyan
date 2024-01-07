import React, { useState } from "react";
import { Link, Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { configLinks, socialLinks } from "../../constants";
import {About, Activity, EditProfile, Issue, Language, Notifications, Privacy, Theme } from '.'
import { logout } from "../../redux/auth/authSlice";
import UserIcon from "../utils/userIcon";

const ConfigSection = ({type}) => {
    return(
        <div className="flex flex-col mt-3">
            <div className="space-y-3 sm:space-y-1">
                <h2 className="sub-title">{type}</h2>
                    {configLinks.filter(opt => opt.type === type).map((opt) =>(
                        <div key={opt.id} className="config-options hover:text-white-light">
                            <Link to={`/settings/${opt.path}`} className="flex px-2 items-center space-x-2">
                                <UserIcon iconName={opt.icon} />
                                <p>{opt.id}</p>
                            </Link>
                        </div>
                    ))}  
                <div className="border-b border-grey-lighter"></div>
            </div>               
        </div>  
    );
}

const ConfigPage = () => {
    const [classSettings, setClassSettings] = useState('block')
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout());
    };

    return(       
        <div className="flex flex-col w-full sm:flex-row">
            <div className="flex flex-col sm:w-2/5 xl:w-1/4 sm:border-x sm:border-grey-lighter px-4">
                <div className={`${classSettings} mt-2`}>
                    <ConfigSection type="account" />
                    <ConfigSection type="interface" />
                    <ConfigSection type="support" />
                    <div className="mt-3">
                        <h2 className="font-medium text-white-medium text-xs uppercase tracking-wide">SOCIAL</h2>
                        <div className="flex space-x-2 text-white-medium py-3 border-b border-grey-lighter ">                        
                            {socialLinks.map((social) => (
                            <Link to={social.link} className="social-links" key={social.id}>
                                <div>
                                    <UserIcon iconName={social.icon} />
                                </div>
                            </Link>
                            ))}                                                                                                                                           
                        </div>
                    </div>
                    <div className="flex flex-col w-full text-red-400 border-b border-grey-lighter">
                        <div className="flex w-full items-center space-x-2 py-3">
                            <UserIcon iconName="logout" />
                            <button onClick={handleLogout}>Log-out</button>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className="sm:flex sm:flex-grow">
                <Routes>
                    <Route path="/edit" element={<EditProfile setClassSettings={setClassSettings} />}></Route>
                    <Route path="/notifications" element={<Notifications setClassSettings={setClassSettings} />}></Route>
                    <Route path="/activity" element={<Activity setClassSettings={setClassSettings} />}></Route>
                    <Route path="/privacy" element={<Privacy setClassSettings={setClassSettings} />}></Route>                    
                    <Route path="/language" element={<Language setClassSettings={setClassSettings} />}></Route>
                    <Route path="/theme" element={<Theme setClassSettings={setClassSettings} />}></Route>
                    <Route path="/about" element={<About setClassSettings={setClassSettings} />}></Route>
                    <Route path="/report" element={<Issue setClassSettings={setClassSettings} />}></Route>
                </Routes>           
            </div>
        </div>
    );
}

export default ConfigPage