import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from "react-router-dom";
import { useGetPostsQuery, setSingle } from "../../redux/post/";
import { Loading, UserIcon } from "../utils/";
import { likePost } from "../../redux/reduxActions";
import AlertPopup from "../utils/";


const SinglePost = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('id');
    const {data: singlePost, isLoading, error } = useGetPostsQuery({origin: 'single', id: postId})
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
        <Loading />
    }

    if (posts.length === 0) {
        <div>No post found.</div>
    }

    return (
        <div className="flex flex-col w-full mt-2 sm:mt-4 sm:justify-center sm:items-center">
            <div className="flex flex-col w-full sm:flex-row sm:w-2/3 bg-grey-medium post-section">                
                <div className="flex w-full px-3 py-2 profile sm:hidden">
                    <div className="flex basis-1/6">
                        <img src={posts[0].avatar} alt={`User ${posts[0].username}`} className="z-0 object-cover object-center" />
                    </div>
                    <div className="flex flex-col basis-5/6">
                        <span className="username">@{posts[0].username}</span>
                        <span className="date">{posts[0].created_at}</span>
                    </div>
                </div>
                <div className="relative h-[430px] sm:h-[660px] sm:order-1 sm:basis-4/6">
                    <img src={posts[0].image} className="post-img" alt="Post content." />
                    <div className="absolute flex items-center space-x-2 bottom-4 left-4 sm:hidden">
                        <div className={posts[0].liked === "yes" && "post-liked"} onClick={() => handleLike(posts[0].id)}>
                            <UserIcon iconName="heart"/>
                        </div>                        
                        <span className="sub-title">{posts[0].likes} Likes</span>
                    </div>
                </div>
                <div className="flex space-x-1 px-4 py-2 max-h-[160px] min-h-[60px] justify-start items-start sm:hidden">
                    <span className="mt-[3px] sub-title">{posts[0].username} - </span>                    
                    <p className="text-sm font-light text-white-medium tracking-wide overflow-auto">{posts[0].content}</p>
                </div>

                <div className="hidden sm:border-l sm:border-grey-light sm:flex sm:basis-2/6 sm:space-y-2 sm:flex-col sm:order-2 sm:px-4 sm:rounded-sm">
                    <div className="flex profile border-b py-4 border-grey-lighter">
                        <div>
                            <img src={posts[0].avatar} alt={`User ${posts[0].username}`} className="object-cover object-center" />
                        </div>
                        <div className="flex flex-col ml-4 justify-center">
                            <span className="username">@{posts[0].username}</span>
                            <span className="date">{posts[0].created_at} ago</span>
                        </div>
                    </div>
                    <div className="flex items-center pt-2 space-x-2">
                        <div className={`cursor-pointer hover:animate-ping ${posts[0].liked === "yes" && "post-liked"}`} onClick={() => handleLike(posts[0].id)}>
                            <UserIcon iconName="heart" />
                        </div>
                        <span className="uppercase text-white-medium text-sm">{posts[0].likes} Likes</span>
                    </div>
                    <div className="flex space-x-1 py-2 justify-start items-start">
                        <span className="mt-[3px] uppercase text-white-light text-sm">{posts[0].username} - </span>                    
                        <p className="font-light text-white-medium tracking-wide overflow-auto">{posts[0].content}</p>
                    </div>
                </div>
            </div>

            {posts.length > 1 &&(
            <div className="flex w-full sm:w-2/3 p-3 sm:p-0 mt-6">
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