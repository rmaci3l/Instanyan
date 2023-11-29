import React, {useEffect} from "react";

function Notifications({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div>Notifications</div>
    );
}

export default Notifications;