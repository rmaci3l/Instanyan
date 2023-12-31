import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileQuery, setProfile, followProfile } from "../../redux/profile/";
import { Avatar } from "flowbite-react";
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
        <div className="flex flex-col bg-grey-medium rounded-md profile-info sm:px-8 sm:py-4">
            <div className="flex w-full px-3 py-2 space-x-2 border-b border-grey-light sm:items-center">
                <div className="flex basis-1/4 py-2">                    
                    <img src={profileDetails.avatar} alt={`Profile image of ${profileDetails.username}`} />
                </div>
                <div className="flex basis-3/4 pl-2 pt-1 flex-col">
                    <div>
                        <span className="text-white-light text-md sm:text-lg">@{profileDetails.username}</span>
                    </div>
                    <div>
                        <span className="text-sm sm:text-base font-light text-white-medium">{profileDetails.status} </span>                            
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex flex-col w-full mt-4">
                            <h2 className="text-white-light">About me</h2>
                            <p className="mt-1 text-sm font-light flex-wrap sm:text-base sm:text-white-medium">{profileDetails.about}</p>
                        </div>
                    </div>             
                </div>
                {username !== userInfo.username &&
                    <button onClick={() => handleFollow(username)} className="border rounded-sm border-neutral-50">Follow</button>
                }
            </div>
            <div className="flex border-b border-grey-light sm:border-none py-3 px-6 justify-between sm:mt-2">
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{profileDetails.posts_qty}</p>
                    <p className="sub-title">Publications</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{profileDetails.followers}</p>
                    <p className="sub-title">Followers</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{profileDetails.following}</p>
                    <p className="sub-title">Following</p>
                </div>
            </div>            
            <div className="flex flex-col w-full p-3 sm:hidden">
                <h2 className="sub-title">About me</h2>
                <p className="mt-1 text-sm font-light flex-wrap">{profileDetails.about}</p>
            </div>
        </div>
    );
};

export default ProfileInfo