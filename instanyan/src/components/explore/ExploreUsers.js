import React, { useEffect } from "react";
import { setExplore, useGetProfileQuery } from "../../redux/profile/";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../utils";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";

const ExploreUsers = ({ username }) => {
    const { data: users, isLoading, error, isSuccess, isError } = useGetProfileQuery({origin: 'explore', username: username.slice(1)})
    const { exploreProfiles } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        if (users){
            dispatch(setExplore(users));
        }
    }, [users, dispatch])

    if (isLoading) {
        return <Loading />
    }

    if (users.error === "nouserfound") {
        return(
            <div>Oops. NO user found!</div>
        )
    }

    return (
        <div className="flex flex-col w-full mt-2 items-center sm:justify-center">
            <div className="space-y-4 px-2 sm:w-3/4 xl:w-2/4">
                <div className="flex-col w-full px-2">
                    <div>
                        <span className="uppercase text-white-medium tracking-wide">User Search</span>
                    </div>
                    <div className="flex font-light text-sm text-white-medium ">
                        <span>{`Found ${exploreProfiles.length} user(s) similar to "`}</span>
                        <span className="text-indigo-500">{`${username}`}</span>
                        <span>":</span>
                    </div>                    
                </div>
                {exploreProfiles.map((profile) => (    
                <Link to={`/profile/${profile.username}`} className="flex w-full">
                    <div key={profile.id} className="flex w-full p-2 rounded-md bg-grey-medium hover:ring-2 sm:ring-indigo-500 sm:transition-all sm:duration-300">                    
                        <div className="flex justify-center items-center w-max shrink-0">
                            <img className="ring-2 ring-indigo-500 object-cover rounded-full h-[52px] w-[52px] sm:w-[62px] sm:h-[62px] p-[2px]" src={profile.avatar} />
                        </div>
                        <div className="flex flex-col space-y-1 p-2">
                            <span className="username">@{profile.username}</span>
                            <span className="text-white-medium tracking-wider uppercase text-xs">{profile.followers} followers</span>
                            <div className="w-11/12 sm:w-full">
                                <p className="text-white-medium font-light text-sm">{profile.status}</p>
                            </div>                        
                        </div>                    
                    </div>            
                </Link>
                ))}
            </div>
        </div>
    )   
}


export default ExploreUsers;