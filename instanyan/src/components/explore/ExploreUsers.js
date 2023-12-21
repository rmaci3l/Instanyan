import React, { useEffect } from "react";
import { useGetProfileQuery } from "../../redux/profile/profileService";
import { useDispatch, useSelector } from "react-redux";
import { setExplore } from "../../redux/profile/profileSlice";

const ExploreUsers = ({ username }) => {
    const { data: users, isLoading, error, isSuccess } = useGetProfileQuery({origin: 'explore', username: username.slice(1)})
    const { exploreProfiles } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (users){
            dispatch(setExplore(users));
        }
    }, [users, dispatch])

    
    // Loading.
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            Explore users
        </div>
    )   
}


export default ExploreUsers;