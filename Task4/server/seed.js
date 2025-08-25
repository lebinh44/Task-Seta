import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Post from "./models/Post.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    await Post.deleteMany({});
    console.log("Old data cleared");

    await Post.insertMany(data);
    console.log("Data imported successfully 🚀");

    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();
