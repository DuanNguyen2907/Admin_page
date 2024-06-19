import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';
import ReactPaginate from 'react-paginate';
import './UserManager.css';



const usersPerPage = 3;

function UserManager() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  // const handleViewDetail = (id) => {
  //   navigate(`/user/${id}`);
  // };

  const handleDelete = async (id,email) => {
    try {
      // Xóa tài liệu user trong Firestore
      await deleteDoc(doc(db, 'users', id));
  
      // Xóa các bài post có authorId là userId đã bị xóa
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(postsCollection, where('authorId', '==', id));
      const postsSnapshot = await getDocs(postsQuery);
      postsSnapshot.docs.forEach(async (post) => {
        await deleteDoc(doc(db, 'posts', post.id));
      });

      // Xóa auth
      // auth.deleteUser(id); 
  
      // Cập nhật state để xóa user khỏi danh sách
      setUsers(users.filter(user => user.id!== id));
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className='user-manager'>
      <h1>User Manager</h1>
      <ul className="user-list">
        {currentUsers.map(user => (
          <li key={user.id} className="user-item">
            <img src={user.avatar} alt={`User ${user.username}`} className="user-avatar" />
            <div className="user-meta">
              <p>Username: {user.username}</p>
              <p>Phone: {user.phone}</p>
              <p>Email: {user.email}</p>
              <p>Address: {user.address}</p>
            </div>
            <div className="user-actions">
            
              <button onClick={() => handleDelete(user.id,user.email)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={Math.ceil(users.length / usersPerPage)}
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

export default UserManager;