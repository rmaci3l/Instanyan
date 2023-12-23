import React from "react";
import Logo from '../../assets/images/logo.png';

const AuthHeader = (props) => {
    return(            
    <div className="flex flex-col p-2 mt-8 sm:-mt-8">
        <img className="w-max self-center" src={Logo} alt='Instanyan'/>
        <div className="flex w-full mt-6 text-center">
            <span className="font-extralight tracking-wide text-xl">
                {props.sub}
            </span>
        </div>
        <div className="py-6"></div>
    </div>
    )
}

export default AuthHeader;