import React, {useEffect}  from "react";

function About({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);
    return(
            <div>About</div>
        );
    }

export default About;