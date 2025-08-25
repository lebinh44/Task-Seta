import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./features/posts/postsSlice";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./style/App.css";

function App() {
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleCreateOrUpdate = async (post) => {
    if (editingPost) {
      const confirmed = window.confirm(
        "Are you sure you want to update this post?"
      );
      if (!confirmed) return;
      await dispatch(updatePost({ id: editingPost._id, data: post }));
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to create this post?"
      );
      if (!confirmed) return;
      await dispatch(createPost(post));
    }
    setEditingPost(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;
    await dispatch(deletePost(id));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Posts Manager</h1>
        {!showForm && (
          <button
            className="create-button"
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
            }}
          >
            + Create Post
          </button>
        )}
      </div>

      <PostForm
        visible={showForm}
        onSubmit={handleCreateOrUpdate}
        editingPost={editingPost}
        onCancel={() => {
          setEditingPost(null);
          setShowForm(false);
        }}
      />

      <div className="post-list-container">
        <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
