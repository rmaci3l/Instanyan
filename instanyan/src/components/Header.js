import React from 'react';
import Logo from '../assets/images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {navLinks} from '../constants';
import { Link } from 'react-router-dom';

function Header(){
    const configItem = navLinks.find(nav => nav.id === "configuration");
    return(     
        <div className='bg-black sticky w-full top-0 left-0 sm:flex-initial sm:flex sm:w-auto sm:min-w-fit'>
            <div className='p-2 sm:p-4 sm:pl-2 sm:pr-28 flex sm:flex-col sm:h-screen justify-between border-b sm:border-r sm:border-b-transparent border-gray-600'>
                <div className='flex w-full sm:flex-col items-center'>
                    <div className='p-2 items-center flex w-full'>
                        <Link to="/" className='flex w-full items-center'>                    
                            <img className='h-14 w-14' src={Logo} alt='instanyan'/>                    
                            <h1 className="font-semibold text-2xl tracking-wider">Instanyan</h1>                            
                        </Link>
                    </div>
                    <div className="p-8 sm:flex w-full hidden">
                        <div className='font-light text-[17px] space-y-6'>
                            {navLinks.filter(nav => nav.id !== "configuration").map((nav, index)=>(
                                <div key={nav.id}>                            
                                    <Link to={`${nav.path}`} className='space-x-4'>
                                        <FontAwesomeIcon icon={nav.icon} className='text-[16px]' />
                                        <span>{nav.title}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex sm:hidden'>
                        <div className='font-light text-[17px] flex space-x-6 p-4'>
                            {navLinks.filter(nav => nav.id ==="search" || nav.id === "notifications").map((nav, index)=>(
                                <div key={nav.id}>                      
                                    <Link to={`${nav.path}`}>
                                        <FontAwesomeIcon icon={nav.icon} className='text-[22px]' />
                                    </Link>      
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='p-8 hidden sm:flex sm:w-full'>                                
                    <Link to={`${configItem.path}`} className='space-x-4 text-[17px]'>
                        <FontAwesomeIcon icon={configItem.icon} className='text-[16px]'/>
                        <span>Configuration</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;