import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from "../../redux/reduxActions";
import { useGetPostsQuery, setPosts } from "../../redux/post/";
import { UserIcon, Loading } from "../utils";
import { Link } from "react-router-dom";
import { Technician } from "../../assets/";

const ExplorePosts = ({ hashtags }) => {
    const { data, isLoading } = useGetPostsQuery({origin: 'explore', hashtags: hashtags} )
    const { posts } = useSelector((state) => state.posts)
    const dispatch = useDispatch();

    useEffect(() => {
        if (data){
            dispatch(setPosts(data));
        }
    }, [data, dispatch])

    const handleLike = (post_id) => {
        dispatch(likePost(post_id));
    }

    // Loading.
    if (isLoading) {
        return <Loading />
    }

    if (data.error === "noposts") {
        return(
            <div className="flex flex-col w-full items-center justify-center">       
                <div className="flex flex-col w-4/5 sm:w-3/4 mt-10 text-center items-center">
                    <img className="rounded-full ring-4 ring-indigo-500 p-2 w-fit sm:h-[380px]" src={Technician} alt=""/>
                    <h1 className="text-white-light font-bold text-3xl tracking-wider mt-8">Oops... Not Found!</h1>
                    <span className="text-white-medium font-light text-lg text-center p-4">It seems we found no posts with the <span className="text-indigo-500 font-medium">{hashtags}</span> hashtag...</span>
                    <span className="text-white-light font-light text-lg text-center p-4"> You can return to <Link to='/' className="text-indigo-500">home</Link>.</span>
                </div>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col w-full my-2 space-y-4 sm:my-4 sm:justify-center sm:items-center">
            <div className="flex flex-col w-full sm:w-4/5 lg:w-3/5 2xl:w-2/5 px-2">
                <div>
                    <span className="uppercase text-white-medium tracking-wide">Post Search</span>
                </div>
                <div className="flex font-light text-sm text-white-medium ">
                    <span>{`Found ${posts.length} post(s) similar to "`}</span>
                    <span className="text-indigo-500">{`${hashtags}`}</span>
                    <span>":</span>
                </div>                    
            </div>
            {posts.map((post, index) => (
                <div key={index} className="bg-grey-medium sm:w-4/5 lg:w-3/5 2xl:w-2/5 sm:rounded-md">
                    <div className="flex w-full">
                        <Link to={`profile/${post.username}`}>
                            <div className="flex w-full p-2 px-3 items-center">
                                <img className="ring-2 ring-indigo-500 rounded-full h-[43px] w-[43px] sm:w-[52px] sm:h-[52px] p-[2px] z-0" src={post.avatar} alt="" />                            
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
                        <img src={post.image} className="w-full h-full object-cover object-center bg-grey-heavy" alt=""/>
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
    )   
}


export default ExplorePosts;