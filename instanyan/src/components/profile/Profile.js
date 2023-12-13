import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import OverlayMenu from "./editOverlay";

function Profile(){
    const [isVisible, setIsVisible] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);


    return(
        <div className='flex h-screen sm:flex-row w-full sm:w-2/3 flex-col sm:gap-20'>
            <div className="flex flex-col sm:w-full sm:py-8">
            {isVisible && (
                            <OverlayMenu onClose={() => setIsVisible(false)} />
                        )}
                <div className="flex w-full p-4 sm:p-0 space-x-2">
                    <div className="flex">
                        <img className="border border-neutral-50 rounded-full h-14 w-14 sm:h-40 sm:w-40" alt={userInfo.username} src={userInfo.profile_image}></img>
                    </div>
                    <div className="pl-6 flex-1 flex-col justify-center">
                        <span className=" text-lg">{userInfo.username}</span>
                        <div>
                            <span>{userInfo.status} </span>                            
                        </div>                        
                    </div>
                    <div className="content-start">
                        <button onClick={() => setIsVisible(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} className='text-[18px]' />    
                        </button>
                    </div>
                </div>
                <div className="flex w-full flex-wrap p-4">
                    <h2 className="flex">About me</h2>
                    <p className="flex w-full font-thin">{userInfo.about}</p>
                </div>
                <div className="user-stats flex border-y border-gray-800 p-4 px-6 justify-between space-x-6">
                    <div className="flex flex-col items-center">
                        <h2>{userInfo.posts}</h2>
                        <p>Publications</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>{userInfo.followers}</h2>
                        <p>Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>{userInfo.following}</h2>
                        <p>Following</p>
                    </div>
                </div>
                {/* Future implementation of profile 3x3 post grid. */}
                <div className="flex">
                    <div className="">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile