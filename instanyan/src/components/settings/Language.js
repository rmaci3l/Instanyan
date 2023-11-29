import React, {useEffect} from "react";

function Language({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);
      
    return(
            <div>Language</div>
        );
    }

export default Language;