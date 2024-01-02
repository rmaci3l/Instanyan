import React, { useEffect, useState } from "react";
import { useGetPostsQuery } from "../../redux/post/postService";
import { setPosts } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const PostGrid = ({username}) => {
    const { data, error, isLoading, isSuccess } = useGetPostsQuery({ origin: 'profile', username: `${username}` })
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (data){
            dispatch(setPosts(data))
        }
    }, [data, dispatch]);

    if (isLoading) {
        return null; 
    }

    if (error) {
        return <div>User not found</div>;
    }
    
    return(
        <div className="mt-2 pb-10 grid grid-cols-3 gap-1 sm:gap-4">
            {posts.map((post, index) => (
                <Link to={`/p?id=${post.id}`} key={index}>                
                    <div className="post-grid">
                        <img src={post.image} className="" alt="Post"/>
                        <span className="">{post.likes} Likes</span>                        
                    </div>
                </Link>
            ))} 
        </div>
    );
};

export default PostGrid