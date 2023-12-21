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
        <div className='flex h-screen sm:flex-row w-full sm:w-2/3 flex-col sm:gap-20'>
            <div className="flex flex-col sm:w-full sm:py-8">                
                <ProfileInfo username={username} />
                <div className="flex space-y-4">
                    <PostGrid username={username} />
                </div>
            </div>
        </div>
    );
}

export default Profile