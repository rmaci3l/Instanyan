import React, {useEffect} from "react";

function Language({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);
      
    return(
            <div className="single-page">
                <h1>Language</h1>
            </div>
        );
    }

export default Language;