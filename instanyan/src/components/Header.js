import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../redux/auth/authService'
import {navLinks} from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/images/logo.jpg';
import { setCredentials } from '../redux/auth/authSlice';
import { toggleSearchPopup, toggleNotificationPopUp } from '../redux/popup/popupSlice';
import  SearchPopUp  from './popup/Search';
import NotificationPopUp from './popup/Notifications';
 
const Header = () => {
    const location = useLocation();
    const hideRoutes = ['/login', '/register'];
    const { data: userDetails, isSuccess } = useGetUserDetailsQuery();
    const dispatch = useDispatch();
    const showNotification = useSelector(state => state.popup.isNotificationVisible);
    const showSearch = useSelector(state => state.popup.isSearchVisibile);

    const navLinksObj = navLinks.reduce((obj, item) =>{
        obj[item.id] = item;
        return obj;
    }, {});
    
    useEffect(() => {
        if (isSuccess && userDetails){
              dispatch(setCredentials({userInfo: userDetails}));       
          }
      }, [userDetails, isSuccess, dispatch]);

    const handleSearchPopUp = () => {
        dispatch(toggleSearchPopup());
    }

    const handleNotifications = () => {
        dispatch(toggleNotificationPopUp());
    }
      
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
                <div className='flex space-x-4'>
                    <button onClick={() => {handleSearchPopUp()}}>
                        <FontAwesomeIcon icon={navLinksObj.search.icon} className='text-[20px]' />
                    </button>
                    <button onClick={() => {handleNotifications()}}>
                        <FontAwesomeIcon icon={navLinksObj.notifications.icon} className='text-[20px]' />
                    </button>                    
                </div>
            </div>
            <div>
                {showNotification && <NotificationPopUp />}            
                
            </div>
            <div>
            {showSearch && <SearchPopUp />}
            </div>
            <div className="text-[20px] space-y-6 mt-12 p-8 hidden sm:block">
                {navLinks.filter(nav => nav.id !== "notifications" && nav.id !== "search").map((nav, index)=>(
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