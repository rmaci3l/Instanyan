import React from "react";
import { Link, Outlet } from 'react-router-dom'

const NotFound = () => {
    return(
        <div>       
            <h1>Unauthorized</h1>
            <span>
                <Link to='/login'>Login</Link> to gain access
            </span>
        </div>
    );   
}

export default NotFound;