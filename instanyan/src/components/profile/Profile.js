import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useGetProfileDetailsQuery } from "../../redux/profile/profileService";
import { setProfile } from "../../redux/profile/profileSlice";
import PostGrid from "./PostGrid";
import { followProfile } from "../../redux/reduxActions";

function Profile({ match }) {   
    const { userprofile } = useParams();
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let username = userprofile ? userprofile : userInfo.username;
    const { data: profileDetails, error, isLoading, isSuccess, refetch } = useGetProfileDetailsQuery(username);
    const { profileInfo } = useSelector((state) => state.profile);   
    const { profilePosts } = useSelector((state) => state.profile);
    
    useEffect(() => {
        if (profileDetails){                       
            dispatch(setProfile( {profile: profileDetails}));
        }
    }, [profileDetails, dispatch]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleFollow = (username) => {
        dispatch(followProfile(username));
    }

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>User not found</div>;
    }
    
    return(
        <div className='flex h-screen sm:flex-row w-full sm:w-2/3 flex-col sm:gap-20'>
            <div className="flex flex-col sm:w-full sm:py-8">
                <div className="flex w-full p-4 sm:p-0 space-x-2">
                    <div className="flex">
                        <img className="border border-neutral-50 rounded-full h-14 w-14 sm:h-40 sm:w-40" alt={profileInfo.username} src={profileInfo.profile_image}></img>
                    </div>
                    <div className="pl-6 flex-1 flex-col justify-center">
                        <span className=" text-lg">{profileInfo.username}</span>
                        <div>
                            <span>{profileInfo.status} </span>                            
                        </div>             
                    </div>
                    {username !== userInfo.username &&
                        <button onClick={() => handleFollow(username)} className="border rounded-sm border-neutral-50">Follow</button>
                    }
                </div>
                <div className="flex w-full flex-wrap p-4">
                    <h2 className="flex">About me</h2>
                    <p className="flex w-full font-thin">{profileInfo.about}</p>
                </div>
                <div className="user-stats flex border-y border-gray-800 p-4 px-6 justify-between space-x-6">
                    <div className="flex flex-col items-center">
                        <h2>{profileInfo.posts_qty}</h2>
                        <p>Publications</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>{profileInfo.followers}</h2>
                        <p>Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>{profileInfo.following}</h2>
                        <p>Following</p>
                    </div>
                </div>
                {/* Future implementation of profile 3x3 post grid. */}
                <div className="flex space-y-4">
                    {isSuccess 
                        ? <PostGrid posts={profilePosts} />
                        : <div>Not yet</div> }
                </div>
            </div>
        </div>
    );
}

export default Profile