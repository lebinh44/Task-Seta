import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("API is running..");
});

mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
