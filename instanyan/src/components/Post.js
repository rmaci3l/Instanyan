import React from "react";
import {Navbar, MobNav} from './';

function Post(params) {
    return(
        <div className='flex h-screen sm:flex-row flex-col w-full'>
            <Navbar />
            Post
            <MobNav />
        </div>
    );
}

export default Post