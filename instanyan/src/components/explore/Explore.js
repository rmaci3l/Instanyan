import React from "react";
import ExplorePosts from "./ExplorePosts"
import ExploreUsers from "./ExploreUsers"
import { useSearchParams, useNavigate } from "react-router-dom";

const Explore = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');
    const navigate = useNavigate();
    let isUserSearch = '';

    if (searchTerm === null){
        navigate('/');
    }
    else{
        isUserSearch = searchTerm.startsWith('@');
    }


    

    return (
        <div className="flex flex-col w-screen">
            {isUserSearch ?
            <ExploreUsers username={searchTerm} /> :
            <ExplorePosts hashtags={searchTerm} /> }
        </div>
    )   
}


export default Explore;