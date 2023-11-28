import React from "react";
import {postIcons, userTemplate, postTemplate} from '../constants';
import Profile from "../assets/templates/username1/profile.jpg";
import imageUrl from "../assets/templates/username1/posts/1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Navbar, MobNav} from './';

function Feed(){     
    return(
        <div className='flex h-screen sm:flex-row flex-col w-full sm:w-2/3'>
            <Navbar />
            <div className="flex flex-col flex-grow">
                <div style={{backgroundImage: `url(${imageUrl})`}} className='shadow-inner bg-cover bg-center flex p-4 flex-col h-4/5 w-full bg-stone-950'>
                    <div className="flex drop-shadow-lg">
                        <img className="border border-neutral-50 rounded-full h-12" src={Profile}></img>
                        <div className="ml-2">
                            <span className="flex">Username</span>
                            <span className="flex">Followers</span>
                        </div>                    
                    </div>
                    <div className="flex flex-grow"></div>                                         
                    <div className="flex w-full justify-start space-x-4 drop-shadow-lg">
                        <a href="">
                            <FontAwesomeIcon icon={postIcons[0]} />
                            <span> 3500</span>
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={postIcons[1]} />
                            <span> 350</span>
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={postIcons[2]} />
                        </a>                    
                    </div>
                </div>
                <div className="flex w-full flex-col p-4">
                    <div className="flex w-full">
                        <span>Username</span>
                    </div>
                    <div className="flex w-full font-light">
                        <span className="break-words text-justify">s4d65as4d65as65as4dasdasj aksljd aslkjd lkasjd lkasjdlk askldaskdasjd asdsakldjaslkdjaslkdaslkjd lalskdjaslk djasd alskdj  askdjaslkdjsalkdjlkasjdlk saj alskdjem ipsum dolor sit ametaspdoaksdpa.</span>           
                    </div>
                </div>
            </div>
            <MobNav />
        </div>
    );
}

export default Feed;