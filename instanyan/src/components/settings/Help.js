import React, {useEffect}  from "react";

function Help({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);    
    return(
        <div className="single-page">
            <h1>Help</h1>
        </div>
    );
}

export default Help;