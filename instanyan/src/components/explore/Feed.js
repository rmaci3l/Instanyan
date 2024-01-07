import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { likePost } from "../../redux/reduxActions";
import { useGetPostsQuery, setPosts } from "../../redux/post/";
import{ Loading, UserIcon } from "../utils/";

function Feed(){     
    const { data: feedPosts, error, isLoading, refetch } = useGetPostsQuery({ origin: 'feed' })
    const { posts } = useSelector((state) => state.posts)
    const dispatch = useDispatch();

    useEffect(() => {
        if (feedPosts){
            dispatch(setPosts(feedPosts))
        }
    }, [feedPosts, dispatch])

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <Loading />; 
    }

    if (error) {
        return <div>Error!</div>;
    }

    const handleLike = (post_id) => {
        dispatch(likePost(post_id));
    }
    
    return(
        <div className="flex flex-col w-full mt-2 space-y-4 sm:mt-4 sm:justify-center sm:items-center">
            {posts.map((post, index) => (
                <div key={index} className="bg-grey-medium sm:w-4/5 lg:w-3/5 2xl:w-2/5 sm:rounded-md">
                    <div className="flex w-full">
                        <Link to={`profile/${post.username}`}>
                            <div className="flex w-full p-2 px-3 items-center">
                                <img className="ring-2 ring-indigo-500 rounded-full h-[43px] w-[43px] sm:w-[52px] sm:h-[52px] p-[2px] z-0" src={post.avatar} />                            
                                <div className="flex flex-col ml-4">
                                    <span className="flex username">@{post.username}</span>
                                    <div className="flex-col post-date">
                                        <span>{post.created_at} ago</span>
                                        <span> 🞄 </span>
                                        <span>{post.followers} followers</span>                                
                                    </div>
                                </div>
                            </div>   
                        </Link>
                    </div>
                    <div className="flex flex-col w-full post-image">                        
                        <img src={post.image} className="w-full h-full object-cover object-center bg-grey-heavy" />
                        <div className="post-icons absolute flex ">
                            <div className={`cursor-pointer ${post.liked === "yes" && "post-liked"}`} onClick={() => handleLike(post.id)}>
                                <UserIcon iconName="heart"/>
                            </div>
                            <span className="sub-title-alt">{post.likes} Likes </span>
                            <span> 🞄</span>
                            <div className={`cursor-pointer`}>
                                <UserIcon iconName="share"/>
                            </div>                            
                        </div>
                    </div>
                    <div className="flex w-full flex-col p-4 post-about">
                        <div className="flex w-full">
                            <span className="uppercase text-xs sm:text-sm">{post.username}</span>
                        </div>
                        <div className="flex flex-col w-full ">
                            <span className="content">{post.content}</span>
                            <span className="hashtags">{post.hashtags}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>    
    );
}

export default Feed;