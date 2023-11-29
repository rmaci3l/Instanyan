import React, {useEffect}  from "react";

function Help({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);    
    return(
        <div>Help</div>
    );
}

export default Help;