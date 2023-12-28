import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {postIcons} from '../../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { likePost } from "../../redux/reduxActions";
import { useGetPostsQuery } from "../../redux/post/postService";
import { setPosts } from "../../redux/post/postSlice";
import Loading from "../utils/Loading";

function Feed(){     
    const { data: feedPosts, error, isLoading, isSuccess, refetch } = useGetPostsQuery({ origin: 'feed' })
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
        <div className="sm:ml-20 flex flex-col bg-stone-950 sm:w-2/3 flex-grow">
            {posts.map((post, index) => (
                <div key={index} className="my-4">
                    <div style={{backgroundImage: `url(${post.image})`}} className='shadow-inner bg-cover 
                    bg-center flex p-4 flex-col h-80-screen w-full'>                        
                        <Link to={`profile/${post.username}`}>
                            <div class="flex space-x-2">
                                <img className="border border-neutral-50 rounded-full h-14 w-14" src={post.avatar} />
                                <div className="flex-col">
                                    <span className="flex">{post.username}</span>
                                    <span className="flex">{post.created_at}</span>
                                    <span className="flex">{post.followers} followers</span>                                
                                </div>                            
                            </div>
                        </Link>
                        <div className="flex flex-grow"></div>
                        <div className="flex w-full justify-start space-x-4">
                                <button onClick={() => handleLike(post.id)}><FontAwesomeIcon icon={postIcons[0]} /></button>
                                <span>{post.likes}</span>
                                <span>Liked: {post.liked}</span>
                                <FontAwesomeIcon icon={postIcons[2]} />
                        </div>
                    </div>
                    <div className="flex w-full flex-col p-4">
                        <div className="flex w-full">
                            <span>{post.username}</span>
                        </div>
                        <div className="flex w-full font-light">
                            <span className="break-words text-justify">{post.content}</span>
                            <span className="break-words text-justify">{post.hashtags}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>    
    );
}

export default Feed;