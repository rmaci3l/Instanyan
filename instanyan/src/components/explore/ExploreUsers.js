import React from "react";
import { useGetExploreUsersQuery } from "../../redux/explore/exploreService";

const ExploreUsers = ({ queryArg }) => {
    const { data: exploreUsers, isLoading: isLoadingUsers } = useGetExploreUsersQuery(queryArg);
    // Loading.
    if (isLoadingUsers) {
        return <div>Loading...</div>
    }
    return (
        <div>
            Explore users
        </div>
    )   
}


export default ExploreUsers;