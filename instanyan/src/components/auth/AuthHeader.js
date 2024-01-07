import React from "react";
import Logo from '../../assets/logo.svg';

const AuthHeader = (props) => {
    return(            
    <div className="flex flex-col p-2 mt-8 sm:-mt-8">
        <img className="w-max p-2 self-center" src={Logo} alt="Instanyan"/>
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