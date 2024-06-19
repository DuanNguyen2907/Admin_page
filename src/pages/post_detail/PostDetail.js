import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ReactPaginate from 'react-paginate';
import './PostDetail.css';

const postsPerPage = 3;

function PostManager() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter(post => post.id !== id));
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);

  return (
    <div className='post-manager'>
      <h1>Post Manager</h1>
      <ul className="post-list">
        {currentPosts.map(post => (
          <li key={post.id} className="post-item">
            <img src={post.imageUrls[0]} alt={`Post ${post.id}`} className="post-image" />
            <div className="post-meta">
              <p>ID: {post.id}</p>
              <p>Content: {post.content.substring(0, 20)}...</p>
              <p>Date: {post.createAt.toString()}</p>
            </div>
            <div className="post-actions">
              <button onClick={() => handleViewDetail(post.id)}>Xem chi tiết</button>
              <button onClick={() => handleDelete(post.id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={Math.ceil(posts.length / postsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
    </div>
  );
}

export default PostManager;
