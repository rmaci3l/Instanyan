import React, {useEffect}  from "react";

function Activity({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div>Activity</div>
    );
}

export default Activity;