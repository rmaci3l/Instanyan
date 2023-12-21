import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/auth/authSlice';
import {navLinks} from '../constants';
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const { userToken } = useSelector((state) => state.auth)
    const hideRoutes = ['/login', '/register']

    if (hideRoutes.includes(location.pathname)) {
        return null;
    }
    
    return(
        
        <div className='fixed bottom-0 p-4 font-light space-x-14 justify-center flex w-full sm:hidden border-t border-gray-600 bg-black'>
            {navLinks.filter(nav => nav.id !== "notifications" && nav.id !== "search").map((nav, index) => (
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