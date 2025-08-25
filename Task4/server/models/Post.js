import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: Number,
    id: Number,
    title: String,
    body: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
