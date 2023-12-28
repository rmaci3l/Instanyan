import React, {useEffect} from "react";

function Notifications({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div className="single-page">
            <h1>Notifications</h1>
        </div>
    );
}

export default Notifications;