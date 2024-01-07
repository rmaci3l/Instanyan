import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mobLinks } from '../constants';
import UserIcon from './utils/userIcon';


const Footer = () => {
    const location = useLocation();
    const hideRoutes = ['/login', '/register']
    const { userToken } = useSelector((state) => state.auth);

    if (hideRoutes.includes(location.pathname)) {
        return null;
    }

    if (!userToken) {
        return null;
    }
    
    return(
        
        <div className="mob-footer">
            {mobLinks.map((nav) => (
                <div key={nav.id} className={location.pathname === nav.path ? "link-active" : ""}>
                    <Link to={`${nav.path}`}>
                        <UserIcon iconName={nav.icon} />
                    </Link>
                </div>                    
            ))}
        </div>
    );
}
export default Footer;