import React from "react";
import {Navbar, MobNav} from './';
import picture from "../assets/templates/username1/profile.jpg";

function Profile(){
    return(
        <div className='flex h-screen sm:flex-row w-full sm:w-2/3 flex-col'>
            <Navbar />
            <div className="flex flex-col sm:w-full sm:py-8">
                <div className="flex p-4 sm:p-0 space-x-2">
                    <div className="flex">
                        <img className="border border-neutral-50 rounded-full h-14 w-14 sm:h-40 sm:w-40" src={picture}></img>
                    </div>
                    <div className="pl-6 flex flex-col justify-center">
                        <span className=" text-lg">Username</span>
                        <span>I'm a kitten. 😾</span>
                    </div>
                </div>
                <div className="flex w-full flex-wrap p-4">
                    <h2 className="flex">About me</h2>
                    <p className="flex w-full font-thin">Lorem Ipsum dolor sit amet.</p>
                </div>
                <div className="flex border-y border-gray-800 p-4 px-6 justify-between space-x-6">
                    <div className="flex flex-col items-center">
                        <h2>23</h2>
                        <p className="font-light text-sm text-stone-300">Publications</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>3</h2>
                        <p className="font-light text-sm text-stone-300">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2>5</h2>
                        <p className="font-light text-sm text-stone-300">Following</p>
                    </div>
                </div>

                {/* Future implementation of profile 3x3 post grid. */}
                <div className="flex">
                    <div className="">
                        
                    </div>
                </div>
            </div>
            <MobNav />
        </div>
    );
}

export default Profile