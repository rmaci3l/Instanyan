import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import {navLinks} from '../constants';
import { useDispatch } from 'react-redux';

function Footer(){
    const dispatch = useDispatch()

    return(
        <div className='fixed bottom-0 p-4 font-light space-x-14 justify-center flex w-full sm:hidden border-t border-gray-600 bg-black'>
            {navLinks.filter(nav => nav.id !== "notifications").map((nav, index) => (
                <div key={nav.id}>
                    <Link to={`${nav.path}`}>
                        <FontAwesomeIcon icon={nav.icon} className='text-[22px]' />
                    </Link>
                </div>                    
            ))}
        </div>
    );
}
export default Footer;