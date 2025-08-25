import React from "react";
import "../style/PostList.css";

function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="post-list">
      <h2>Posts List</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>User ID: {post.userId}</small>
          <div className="buttons">
            <button className="edit" onClick={() => onEdit(post)}>
              Edit
            </button>
            <button className="delete" onClick={() => onDelete(post._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
