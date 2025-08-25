import React, { useState, useEffect } from "react";
import "../style/PostForm.css";

function PostForm({ onSubmit, editingPost, onCancel, visible }) {
  const [form, setForm] = useState({ title: "", body: "", userId: "" });

  useEffect(() => {
    if (editingPost) {
      setForm(editingPost);
    }
  }, [editingPost]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", body: "", userId: "" });
  };

  if (!visible) return null;

  return (
    <div className="post-form-overlay">
      <form className="post-form" onSubmit={handleSubmit}>
        <button
          className="close-button"
          onClick={onCancel}
          aria-label="Close form"
        >
          ×
        </button>
        <h2>{editingPost ? "Edit Post" : "Create Post"}</h2>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Body"
          required
        />
        <input
          type="number"
          name="userId"
          value={form.userId}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        <div className="buttons">
          <button type="submit">{editingPost ? "Update" : "Create"}</button>
          {editingPost && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
