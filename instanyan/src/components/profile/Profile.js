import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostGrid from "./PostGrid";
import ProfileInfo from "./ProfileInfo";


function Profile({ match }) {   
    const { userprofile } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const username = userprofile ? userprofile : userInfo.username;

    return(
        <div className="flex p-4 w-full sm:ml-20 sm:justify-center sm:flex-row sm:w-full">
            <div className="flex flex-col sm:w-2/3">                
                <ProfileInfo username={username} />
                <div className="flex w-full">
                    <PostGrid username={username} />
                </div>
            </div>
        </div>
    );
}

export default Profile