import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {authRouter} from "./routes/auth.js"
import {usersRouter} from "./routes/users.js"
import postsRouter from "./routes/posts.js"
import categoryRouter from "./routes/categories.js";
import  Multer  from "multer";
import path from 'path';
import * as url from 'url';
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config();
const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });
  const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = Multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use("/api/auth",authRouter)
app.use("/api/users",usersRouter)
app.use("/api/posts",postsRouter)
app.use("/api/categories",categoryRouter)

app.listen(process.env.PORT, () => {
  console.log("Backend is running");
});
