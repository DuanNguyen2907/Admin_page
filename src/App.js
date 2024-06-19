import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostManager from './pages/post_detail/PostDetail';
import PostDetail from './pages//post_manage/PostManager';
import NavBar from './components/NavBar/NavBar';
import UserManager from './pages/user_manager/UserManager';

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Routes>
            <Route path="/" element={<PostManager />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/user" element={<UserManager />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
