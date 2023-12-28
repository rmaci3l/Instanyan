import React, {useEffect}  from "react";

function Issue({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div className="single-page">
            <h1>Report an Issue</h1>
        </div>
    );
}

export default Issue;