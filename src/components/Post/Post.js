import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
    return (
        <div className="post-item">
            <h2>{post.content.substring(0, 100)}...</h2>
            {post.imageUrlLists.length > 0 && (
                <img src={post.imageUrlLists[0]} alt="Post Thumbnail" width="100" />
            )}
            <p>Post ID: {post.postId}</p>
            <p>Created At: {new Date(post.createAt).toLocaleDateString()}</p>
            <Link to={`/post/${post.postId}`}>View Details</Link>
        </div>
    );
};

export default PostItem;
