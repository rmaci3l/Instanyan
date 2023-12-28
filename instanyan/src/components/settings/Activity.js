import React, {useEffect}  from "react";

function Activity({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div className="single-page">
            <h1>Activity</h1>
        </div>
    );
}

export default Activity;