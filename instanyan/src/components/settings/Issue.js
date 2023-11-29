import React, {useEffect}  from "react";

function Issue({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div>Issue</div>
    );
}

export default Issue;