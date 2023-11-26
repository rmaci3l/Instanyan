import React from 'react';
import Logo from '../assets/images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {navLinks} from '../constants';

function Navbar(){
    const configItem = navLinks.find(nav => nav.id === "configuration");
    return(     
        <div className='p-2 sm:p-4 sm:pl-2 sm:pr-16 flex sm:flex-col sm:h-screen justify-between border-b sm:border-r sm:border-b-transparent border-gray-600'>
            <div className='flex w-full sm:flex-col items-center'>
                <div className='p-2 items-center flex w-full'>
                    <a href="/" className='flex w-full items-center'>
                        <img className='h-14 w-14' src={Logo} alt='instanyan'/>                    
                        <h1 className="font-semibold text-2xl tracking-wider">Instanyan</h1>                            
                    </a>
                </div>
                <div className="p-8 sm:flex w-full hidden">
                    <ul className='font-light text-[17px] space-y-6'>
                        {navLinks.filter(nav => nav.id !== "configuration").map((nav, index)=>(
                            <li key={nav.id}>                            
                                <a className='space-x-4' href={`#${nav.id}`}>
                                    <FontAwesomeIcon icon={nav.icon} className='text-[16px]' />
                                    <span>{nav.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex sm:hidden'>
                    <div className='font-light text-[17px] flex space-x-6 p-4'>
                        {navLinks.filter(nav => nav.id ==="search" || nav.id === "notifications").map((nav, index)=>(
                            <div key={nav.id}>                            
                                <a className='' href={`#${nav.id}`}>
                                    <FontAwesomeIcon icon={nav.icon} className='text-[22px]' />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='p-8 hidden sm:flex'>                
                <a href={`#${configItem.id}`} className='space-x-4 text-[17px]'>
                    <FontAwesomeIcon icon={configItem.icon} className='text-[16px]'/>
                    <span>Configuration</span>
                </a>
            </div>
        </div>
    );
}

export default Navbar;