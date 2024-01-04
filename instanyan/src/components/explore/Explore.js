import React from "react";
import { useSelector } from 'react-redux';
import ExplorePosts from "./ExplorePosts"
import ExploreUsers from "./ExploreUsers"
import { useSearchParams } from "react-router-dom";

const Explore = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');
    const isUserSearch = searchTerm.startsWith('@');

    

    return (
        <div className="flex flex-col w-screen">
            {isUserSearch ?
            <ExploreUsers username={searchTerm} /> :
            <ExplorePosts hashtags={searchTerm} /> }
        </div>
    )   
}


export default Explore;