import React, {useEffect} from "react";
import { useDispatch } from 'react-redux'
import { useGetExplorePostsQuery } from "../../redux/explore/exploreService";
import {postIcons, userTemplate, postTemplate} from '../../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { likePost } from "../../redux/reduxActions";

const ExplorePosts = ({ queryArg }) => {
    const { data: explorePosts, isLoading: isLoadingPosts, isError, error, refetch } = useGetExplorePostsQuery(queryArg);
    const dispatch = useDispatch();

    const handleLike = (post_id) => {
        dispatch(likePost(post_id));
    }

    useEffect(() => {
        refetch();
    }, [refetch]);  

    // Loading.
    if (isLoadingPosts) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.data.message}</div>
    }
    
    return (
        <div className="sm:ml-20 flex flex-col bg-stone-950 sm:w-2/3 flex-grow">
            {explorePosts.posts.map((post, index) => (
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
    )   
}


export default ExplorePosts;