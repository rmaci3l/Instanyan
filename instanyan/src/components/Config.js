import React, {useEffect, useState} from "react";
import { configLinks } from "../constants";
import {Navbar, MobNav} from './'
import { Link } from "react-router-dom";
import { Routes, Route, useLocation, Switch } from 'react-router-dom';
import {About, Activity, EditProfile, Help, Issue, Language, Notifications} from '../components/settings'

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

    return(       
        <div className='flex h-screen sm:flex-row flex-col w-full'>
            <Navbar />
            <div className={`flex flex-col sm:w-1/4 sm:border-r sm:border-gray-600`}>
                <div className={classSettings}>
                    <ConfigSection type="account" />
                    <ConfigSection type="company" />
                </div>
            </div>
            <div className="sm:flex sm:flex-grow">
                <Routes>
                    <Route path="/edit" element={<EditProfile setClassSettings={setClassSettings}/>}></Route>
                    <Route path="/language" element={<Language setClassSettings={setClassSettings} />}></Route>
                    <Route path="/activity" element={<Activity setClassSettings={setClassSettings} />}></Route>
                    <Route path="/notifications" element={<Notifications setClassSettings={setClassSettings} />}></Route>
                    <Route path="/about" element={<About setClassSettings={setClassSettings} />}></Route>
                    <Route path="/help" element={<Help setClassSettings={setClassSettings} />}></Route>
                    <Route path="/report" element={<Issue setClassSettings={setClassSettings} />}></Route>
                </Routes>           
            </div>
            <MobNav />
        </div>
    );
}

export default ConfigPage