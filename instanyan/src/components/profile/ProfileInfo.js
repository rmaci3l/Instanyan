import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { useGetProfileQuery, setProfile, followProfile } from "../../redux/profile/";
import { UserIcon, Loading } from "../utils";
import { Technician } from "../../assets";

const ProfileInfo = ({username}) => {
    const { data, error, isLoading, isRejected } = useGetProfileQuery({origin: 'profile', username: username});
    const { profileDetails, follows } = useSelector((state) => state.profile);
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
        return (
        <div className="flex w-full h-full items-center justify-center">
            <Loading /> 
        </div>
        
        );
    }

    if (isRejected) {
        return(
            <div className="flex flex-col w-full items-center justify-center">       
                <div className="flex flex-col w-4/5 sm:w-3/4 mt-10 text-center items-center">
                    <img className="rounded-full ring-4 ring-indigo-500 p-2 w-fit sm:h-[380px]" src={Technician} alt=""/>
                    <h1 className="text-white-light font-bold text-3xl tracking-wider mt-8">Oops... there's an issue!</h1>
                    <span className="text-white-medium font-light text-lg text-center p-4">It seems there was error while accessing our server. Our catnicians are trying to fix the problem.</span>
                    <span className="text-white-light font-light text-lg text-center p-4"> You can return to <Link to='/' className="text-indigo-500">home</Link>.</span>
                </div>
            </div>
        )
    }
    

    if (error) {
        return <div>User not found</div>;
    }


    return(
        <div className="flex flex-col bg-grey-medium rounded-md profile-info sm:px-8 sm:py-4">
            <div className="relative flex w-full px-3 py-2 space-x-2 border-b border-grey-light sm:items-center">
                <div className="flex basis-1/4 py-2 shrink-0 items-center justify-center">
                    <img src={username === userInfo.username ? userInfo.avatar : profileDetails.avatar} alt="" className="object-cover object-center"/>
                </div>
                <div className="flex basis-3/4 pl-2 pt-1 flex-col h-full w-full">
                    <div>
                        <span className="text-white-light text-md sm:text-lg">@{username === userInfo.username ? userInfo.username : profileDetails.username}</span>
                    </div>
                    <div>
                        <span className="text-sm sm:text-base font-light text-white-medium">{username === userInfo.username ? userInfo.status : profileDetails.status} </span>                            
                    </div>
                    <div className="flex-col w-full mt-4 hidden sm:block">
                        <h2 className="text-white-light">About me</h2>
                        <p className="mt-1 text-sm font-light flex-wrap sm:text-base sm:text-white-medium">{username === userInfo.username ? userInfo.about : profileDetails.about}</p>
                    </div>             
                </div>
                {username !== userInfo.username && 
                    <div className="absolute top-2 right-2 flex space-x-1 items-center"> 
                        <button onClick={() => handleFollow(username)} className="uppercase text-white-medium font-medium text-xs sm:text-sm">{follows}</button>
                        <UserIcon iconName={follows === "Following" ? "following" : "follow"} />
                    </div>
                }                               
            </div>
            <div className="flex border-b border-grey-light sm:border-none py-3 px-6 justify-between sm:mt-2">
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{username === userInfo.username ? userInfo.posts_qty : profileDetails.posts_qty}</p>
                    <p className="sub-title">Publications</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{username === userInfo.username ? userInfo.followers :profileDetails.followers}</p>
                    <p className="sub-title">Followers</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-white-medium sm:text-lg">{username === userInfo.username ? userInfo.following : profileDetails.following}</p>
                    <p className="sub-title">Following</p>
                </div>
            </div>            
            <div className="flex flex-col w-full p-3 sm:hidden">
                <h2 className="sub-title">About me</h2>
                <p className="mt-1 text-sm font-light flex-wrap">{username === userInfo.username ? userInfo.about :profileDetails.about}</p>
            </div>
        </div>
    );
};

export default ProfileInfo