import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from "react-router-dom";
import { useGetPostsQuery, setSingle } from "../../redux/post/";
import { Loading, UserIcon } from "../utils/";
import { likePost } from "../../redux/reduxActions";
import { Technician } from "../../assets";

const SinglePost = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('id');
    const {data: singlePost, isLoading, isRejected } = useGetPostsQuery({origin: 'single', id: postId})
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    
    useEffect(() => {
      if (singlePost) {
        dispatch(setSingle(singlePost))
      }
    }, [singlePost, dispatch])
    
    const handleLike = (post_id) => {
        dispatch(likePost(post_id));
    }

    if (isLoading) {
        <div className="flex w-full justify-center items-center">
            <Loading />
        </div>        
    }

    if (isRejected) {
        return(
            <div className="flex flex-col w-full items-center justify-center">       
                <div className="flex flex-col w-4/5 sm:w-3/4 mt-10 text-center items-center">
                    <img className="rounded-full ring-4 ring-indigo-500 p-2 w-fit sm:h-[380px]" src={Technician} alt=""/>
                    <h1 className="text-white-light font-bold text-3xl tracking-wider mt-8">Oops... there's an issue!</h1>
                    <span className="text-white-medium font-light text-lg text-center p-4">It seems there was error while accessing our server. Our catnicians are trying to fix the problem.</span>
                    <span className="text-white-light font-light text-lg text-center p-4"> You can return to <Link to='/' className="text-indigo-500">home</Link>.</span>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        <div>No post found.</div>
    }


    return (
        <div className="flex flex-col w-full mt-2 sm:mt-4 sm:justify-center sm:items-center">
            <div className="post-section ">                
                <div className="profile-mob">
                    <div className="flex basis-1/6 items-center justify-center">
                        <img src={posts[0].avatar} alt={`User ${posts[0].username}`} />
                    </div>
                    <div className="flex flex-col basis-5/6">
                        <span className="username">@{posts[0].username}</span>
                        <div className="flex-col post-date">
                            <span className="date">{posts[0].created_at} ago</span> 
                            <span> - </span>
                            <span>{posts[0].followers} followers</span>    
                        </div>                                               
                    </div>
                </div>
                <div className="post-image sm:order-1 sm:basis-4/6">
                    <img src={posts[0].image} alt="Post content." />
                    <div className="sm:hidden post-icons absolute flex">
                        <div className={posts[0].liked === "yes" && "post-liked"} onClick={() => handleLike(posts[0].id)}>
                            <UserIcon iconName="heart"/>
                        </div>                        
                        <span className="sub-title-alt">{posts[0].likes} Likes</span>
                        <span> -</span>
                        <div className={`cursor-pointer`}>
                                <UserIcon iconName="share"/>
                        </div>  
                    </div>
                </div>
                <div className="post-about flex flex-col sm:hidden">
                    <div className="flex w-full">
                        <span className="mt-[3px] username">{posts[0].username}</span>                    
                    </div>
                    <div className="flex flex-col w-full">
                        <span className="content">{posts[0].content}</span>
                        <span className="hashtags">{posts[0].hashtags}</span>
                    </div>                                        
                </div>

                <div className="post-section-desk">
                    <div className="profile-desk">
                        <div>
                            <img src={posts[0].avatar} alt={`User ${posts[0].username}`} />
                        </div>
                        <div className="flex flex-col ml-4 justify-center">
                            <span className="username">@{posts[0].username}</span>
                            <span className="date">{posts[0].created_at} ago</span>
                        </div>
                    </div>
                    <div className="flex items-center pt-2 space-x-2 post-icons">
                        <div className={`cursor-pointer hover:animate-ping ${posts[0].liked === "yes" && "post-liked"}`} onClick={() => handleLike(posts[0].id)}>
                            <UserIcon iconName="heart" />
                        </div>
                        <span className="sub-title-alt">{posts[0].likes} Likes</span>
                        <span> -</span>
                        <div className={`cursor-pointer`}>
                                <UserIcon iconName="share"/>
                        </div> 
                    </div>
                    <div className="flex flex-col post-about -ml-3">
                        <div className="flex flex-col">
                            <span className="username">{posts[0].username}</span>               
                            <span className="content mt-2">{posts[0].content}</span>
                        </div>
                        <span className="hashtags">{posts[0].hashtags}</span>
                    </div>
                </div>
            </div>

            {posts.length > 1 &&(
            <div className="flex w-full sm:w-11/12 xl:w-2/3 p-3 sm:p-0 mt-6">
                <div className="flex flex-col w-full space-y-6 border-t border-grey-lighter">
                    <span className="uppercase text-xs text-white-medium sm:text-sm mt-6">More posts from {posts[0].username}</span>
                    <div className="pb-10 grid grid-cols-3 gap-1 sm:gap-4">
                        {posts.slice(1).map((additionalPost, index) => (
                            <Link to={`/p?id=${additionalPost.id}`} key={index}>                
                                <div className="post-grid">
                                    <img src={additionalPost.image} className="" alt="Post"/>
                                    <span className="">{additionalPost.likes} Likes</span>                        
                                </div>
                            </Link>
                        ))} 
                    </div>
                </div>
            </div>
            )}
        </div>        
    )
}


export default SinglePost;