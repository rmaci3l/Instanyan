import React from 'react';
import Logo from '../assets/images/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function Navbar(){
    return(        
        <div className='w-3/10 flex flex-wrap justify-center items-center'>
            <div className='p-6 flex w-full items-center'>                
                    <img className='h-14 w-14' src={Logo} alt='logo'/>                    
                    <h1 className="font-semibold text-2xl tracking-wider">Instanyan</h1>                            
            </div>
            <div className="p-6 flex w-full">
                <a href="" className='flex items-center justify-center'>
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Home</span>
                </a>
                <ul>
                    <li>Home</li>
                    <li>Search</li>                
                    <li>Post</li>
                    <li>Profile</li>
                    <li>Notifications</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;