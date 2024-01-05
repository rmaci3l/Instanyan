import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useGetUserDetailsQuery, setCredentials } from '../redux/auth';
import {navLinks} from '../constants';
import { Logo, LogoIcon } from '../assets/';
import { toggleSearchPopup } from '../redux/popup/popupSlice';
import  SearchPopUp  from './utils/Search';
import UserIcon from './utils/userIcon';
import { Avatar } from 'flowbite-react';

const Header = () => {
    const location = useLocation();
    const hideRoutes = ['/login', '/register'];
    const { data: userDetails, isSuccess } = useGetUserDetailsQuery();
    const dispatch = useDispatch();
    const showSearch = useSelector(state => state.popup.isSearchVisibile);
    const { userToken } = useSelector((state) => state.auth);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess && userDetails){
              dispatch(setCredentials({userInfo: userDetails}));       
          }
      }, [userDetails, isSuccess, dispatch, userInfo]);

    const handleSearchPopUp = (confirm) => {
        if (confirm === 'search') {
            dispatch(toggleSearchPopup());
        }        
    }

    if (hideRoutes.includes(location.pathname)) {
        return null;
    };  

    if (!userToken) {
        return null;
    }

    return(     
        <div className="flex w-screen sm:w-auto sticky z-10 top-0 left-0 bg-grey-medium sm:h-screen">            
            <div className="mobile-nav">
                <div>
                    <Link to="/" >                    
                        <img className="w-[108px]" src={Logo} alt="Instanyan logo"/>                    
                    </Link>
                </div>
                <div className="flex-grow"></div>
                <div className="flex mob-icons text-white-medium space-x-4">
                    <button className={showSearch === true ? 'text-white-light' : ''} onClick={() => {handleSearchPopUp('search')}}>
                        <UserIcon iconName="search" />
                    </button>
                    <Link to="/profile">
                        <Avatar img={userInfo.avatar ? userInfo.avatar : undefined} size="sm" bordered rounded statusPosition="top-right" />           
                    </Link>
                </div>
            </div>
            
            <div className="desk-nav">
                <div className="desk-logo">
                    <div className="my-4">
                        <Link to="/">
                            <img className="w-7" src={LogoIcon} alt="Instanyan Logo" />
                        </Link>
                    </div>       
                    <div />             
                </div>
                <div className="flex flex-col space-y-6 mt-6">
                    {navLinks.map((nav) => (
                        <Link to={`${nav.path}`} key={nav.id}>
                            <div className={location.pathname === nav.path ? 'desk-links-active' : 'desk-links'}
                            onClick={() => handleSearchPopUp(nav.function)}>
                                <UserIcon iconName={nav.icon} />
                                <span>{nav.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-grow"></div>                
                <div className="desk-footer">
                    <div className="flex">
                        <Link to="/profile">
                            <Avatar img={userInfo.avatar ? userInfo.avatar : undefined} size="md" bordered rounded status="online" statusPosition="top-right" />
                        </Link>
                    </div>
                    <div className="flex text-xl">
                        <div className={location.pathname === '/settings' ? 'text-indigo-500' : 'text-white-medium'}>
                            <Link to="/settings">
                                <UserIcon iconName="settings"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {showSearch && <SearchPopUp />}
            </div>
        </div>
    );
}

export default Header;