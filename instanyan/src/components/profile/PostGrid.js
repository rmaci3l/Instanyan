import React, { useEffect } from "react";
import { useGetPostsQuery, setPosts } from "../../redux/post/";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const PostGrid = ({username}) => {
    const { data, isLoading } = useGetPostsQuery({ origin: 'profile', username: `${username}` })
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

    if (posts.length !== 0){
        return (
            <div className="mt-2 py-8 flex flex-col w-full bg-grey-medium rounded-md justify-center items-center text-white-medium text-xl tracking-wide">
                    <p className="text-white-light font-medium">Oops!</p>
                    <p className="text-white-medium">No posts found.</p>
            </div>
        )
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

export default PostGrid;