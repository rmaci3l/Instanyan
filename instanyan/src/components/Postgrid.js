import React from "react";
import Placeholder from './Placeholder'

function PostGrid(){
    // PlaceHolder data
    const posts = [1, 2, 3, 4, 5, 6];
    
    return(
        <div className="w-7/10 flex justify-center items-center">
            {posts.map(post => (
                <Placeholder key={post} />
            ))}                    
        </div>
    );
}

export default PostGrid;