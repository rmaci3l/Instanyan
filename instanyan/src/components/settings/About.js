import React, {useEffect}  from "react";

function About({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);
    return(
        <div className="single-page">
            <h1>About</h1>
        </div>
        );
    }

export default About;