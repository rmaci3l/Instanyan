import React, { useEffect, useState } from "react";
import { useGetPostsQuery } from "../../redux/post/postService";
import { setPosts } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from 'react-redux'

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="mb-2">
                        <img src={post.image} alt="Post" className="w-full h-auto object-cover rounded" />
                    </div>
                    <div>{post.likes} Likes</div>
                    <div>
                        <p className="text-gray-50 text-sm">{post.content}</p>"
                    </div>
                </div>
            ))} 
        </div>
    );
};

export default PostGrid