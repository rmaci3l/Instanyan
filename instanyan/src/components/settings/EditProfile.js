import React, {useEffect} from "react";

function EditProfile({setClassSettings}){
    useEffect(() => {
        setClassSettings('hidden sm:block');
        return() => {
            setClassSettings('block');
        };
      },[setClassSettings]);

    return(
        <div>
            Edit Profile
        </div>   
    );
}

export default EditProfile;