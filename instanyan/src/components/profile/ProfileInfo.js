import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileQuery, setProfile, followProfile } from "../../redux/profile/";
import Loading from "../utils/Loading";

const ProfileInfo = ({username}) => {
    const { data, error, isLoading, isSuccess } = useGetProfileQuery({origin: 'profile', username: username});
    const { profileDetails } = useSelector((state) => state.profile);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (data){                       
            dispatch(setProfile(data));
        }
    }, [data, dispatch]);
    
    const handleFollow = (username) => {
        dispatch(followProfile(username));
    }

    if (isLoading) {
        return <Loading />; 
    }

    if (error) {
        return <div>User not found</div>;
    }


    return(

        <div>
            <div className="flex w-full p-4 sm:p-0 space-x-2">
                <div className="flex">
                    <img className="border border-neutral-50 rounded-full h-14 w-14 sm:h-40 sm:w-40" alt={profileDetails.username} src={profileDetails.profile_image}></img>
                </div>
                <div className="pl-6 flex-1 flex-col justify-center">
                    <span className=" text-lg">{profileDetails.username}</span>
                    <div>
                        <span>{profileDetails.status} </span>                            
                    </div>             
                </div>
                {username !== userInfo.username &&
                    <button onClick={() => handleFollow(username)} className="border rounded-sm border-neutral-50">Follow</button>
                }
            </div>
            <div className="flex w-full flex-wrap p-4">
                <h2 className="flex">About me</h2>
                <p className="flex w-full font-thin">{profileDetails.about}</p>
            </div>
            <div className="user-stats flex border-y border-gray-800 p-4 px-6 justify-between space-x-6">
                <div className="flex flex-col items-center">
                    <h2>{profileDetails.posts_qty}</h2>
                    <p>Publications</p>
                </div>
                <div className="flex flex-col items-center">
                    <h2>{profileDetails.followers}</h2>
                    <p>Followers</p>
                </div>
                <div className="flex flex-col items-center">
                    <h2>{profileDetails.following}</h2>
                    <p>Following</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo