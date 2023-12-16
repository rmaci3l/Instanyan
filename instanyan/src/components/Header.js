import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../redux/authService'
import {navLinks} from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/logo.jpg';
import { setCredentials } from '../redux/authSlice';


const Header = () => {
    const location = useLocation();
    const hideRoutes = ['/login', '/register'];
    const { data: userDetails, isSuccess } = useGetUserDetailsQuery();
    const dispatch = useDispatch();

    const navLinksObj = navLinks.reduce((obj, item) =>{
        obj[item.id] = item;
        return obj;
    }, {});
    
    useEffect(() => {
        if (isSuccess && userDetails){
              dispatch(setCredentials({userInfo: userDetails}));       
          }
      }, [userDetails, isSuccess, dispatch]);

    if (hideRoutes.includes(location.pathname)) {
        return null;
    };    

    return(     
        <div className='bg-black font-light sticky top-0 flex sm:h-screen sm:flex-col sm:w-1/5 sm:min-w-fit p-2 sm:p-4 sm:pl-2 border-b sm:border-r sm:border-b-transparent border-gray-600'>
            <div className='p-2 pr-4 flex w-full'>
                <Link to="/" className='flex w-full items-center'>                    
                    <img className='h-14 w-14' src={Logo} alt='instanyan'/>                    
                    <h1 className="font-semibold text-2xl tracking-wider">Instanyan</h1>                            
                </Link>
                <button key={navLinksObj.notifications.id}>
                    <FontAwesomeIcon icon={navLinksObj.notifications.icon} className='text-[22px]' />
                </button>
            </div>
            <div className="text-[20px] space-y-6 mt-12 p-8 hidden sm:block">
                {navLinks.filter(nav => nav.id !== "notifications").map((nav, index)=>(
                    <div key={nav.id}>                            
                        <Link to={`${nav.path}`} className='space-x-4'>
                            <FontAwesomeIcon icon={nav.icon} className='text-[16px]' />
                            <span>{nav.title}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Header;