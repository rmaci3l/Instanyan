import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { useGetPostsQuery, setSingle } from "../../redux/post/";
import { Loading, UserIcon } from "../utils/";
import { likePost } from "../../redux/reduxActions";

const SinglePost = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('id');
    const {data: post, isLoading, error, isSuccess } = useGetPostsQuery({origin: 'single', id: postId})
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
      if (post) {
        dispatch(setSingle(post))
      }
    }, [post, dispatch])
    
    const handleLike = (post_id) => {
        dispatch(likePost(post_id));
    }


    if (isLoading) {
        <Loading />
    }

    if ( posts === []) {
        <div>No post found.</div>
    }

    if (isSuccess) {
        
    }
    return (
        <div className="flex w-full mt-4 sm:justify-center sm:flex-row">
            <div className="flex flex-col w-full sm:w-2/3 bg-grey-medium post-section">
                <div className="flex w-full px-3 py-2 profile">
                    <div className="flex basis-1/6">
                        <img src={posts[0].avatar} alt={`Profile picture of user ${posts[0].username}`} className="object-cover object-center" />
                    </div>
                    <div className="flex flex-col basis-5/6">
                        <span className="username">@{posts[0].username}</span>
                        <span className="date">{posts[0].created_at}</span>
                    </div>                    
                </div>
                <div className="relative h-[430px]">
                    <img src={posts[0].image} className="post-img" />
                    <div className="absolute flex items-center space-x-2 bottom-4 left-4 ">
                        <div className={posts[0].liked == "yes" && "post-liked"} onClick={() => handleLike(posts[0].id)}>
                            <UserIcon iconName="heart"/>
                        </div>                        
                        <span className="sub-title">{posts[0].likes} Likes</span>
                    </div>
                </div>
                <div className="flex px-4 py-2 max-h-[160px] min-h-[60px] justify-start items-start">
                    <span className="mt-[2px] sub-title">{posts[0].username} - </span>                    
                    <p className="text-sm font-light text-white-medium tracking-wide overflow-auto">{posts[0].content}</p>
                </div>
            </div>
        </div>
    )   
}


export default SinglePost;