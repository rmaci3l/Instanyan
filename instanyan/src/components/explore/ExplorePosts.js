import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from "../../redux/reduxActions";
import { useGetPostsQuery } from "../../redux/post/postService";
import { setPosts } from "../../redux/post/postSlice";

const ExplorePosts = ({ hashtags }) => {
    const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery({origin: 'explore', hashtags: hashtags} )
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
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.data.message}</div>
    }
    
    return (
        <div className="sm:ml-20 flex flex-col bg-stone-950 sm:w-2/3 flex-grow">
            <div>Explore Posts</div>
        </div> 
    )   
}


export default ExplorePosts;