import React from 'react';
import Logo from '../assets/images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {navLinks} from '../constants';

function Navbar(){
    return(        
        <div className='w-3/10 flex flex-wrap justify-center items-center'>
            <div className='p-6 flex w-full items-center'>                
                    <img className='h-14 w-14' src={Logo} alt='instanyan'/>                    
                    <h1 className="font-semibold text-2xl tracking-wider">Instanyan</h1>                            
            </div>
            <div className="p-6 flex w-full">
                <ul className='font-light text-[18px] space-y-6'>
                    {navLinks.map((nav, index)=>(
                        <li key={nav.id}>                            
                            <a className='space-x-4' href={`#${nav.id}`}>
                                <FontAwesomeIcon icon={nav.icon} className='text-[16px]' />
                                <span>{nav.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;