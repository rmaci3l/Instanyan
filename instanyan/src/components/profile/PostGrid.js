import React from 'react';

const PostGrid = ({ posts }) => {
    return(
        <div className="">
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