import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import './PostManager.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', id);
      const postSnapshot = await getDoc(postDoc);
      if (postSnapshot.exists()) {
        setPost(postSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-detail">
      <h1>Post Detail</h1>
      <div className="post-info">
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="post-images">
            {post.imageUrls.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Post ${id} Image ${index + 1}`} className="post-image" />
            ))}
          </div>
        )}
        <div className="post-meta">
          <p>ID: {id}</p>
          <p>Content: {post.content}</p>
          <p>Date: {post.createAt.toString()}</p>
        </div>
      </div>
      <div className="post-actions">
        <button
          onClick = {deletePost(id)}
        >Delete</button>
      </div>
    </div>
  );
}

async function deletePost(id) {
  const postDoc = doc(db, 'posts', id);
  await deleteDoc(postDoc);
}

export default PostDetail;
