import React from "react";
import { useSelector } from 'react-redux';
import { useGetExplorePostsQuery, useGetExploreUsersQuery } from "../../redux/explore/exploreService";
import ExplorePosts from "./ExplorePosts"
import ExploreUsers from "./ExploreUsers"

const Explore = () => {
    let searchTerm = useSelector((state) => state.explore.searchTerm);

    // Determine the type of search.
    const isUserSearch = searchTerm.startsWith('@')
    const queryArg = searchTerm.slice(1); // Remove the @ or the #.
    

    return (
        <div>
            {isUserSearch ?
            <ExploreUsers queryArg={queryArg} /> :
            <ExplorePosts queryArg={queryArg} /> }
        </div>
    )   
}


export default Explore;