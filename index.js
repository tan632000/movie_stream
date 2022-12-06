import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bannerRoutes from "./routes/banners.js";
import favoriteRoutes from "./routes/favorites.js";
import movieRoutes from "./routes/movies.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("database connnected");
    })
    .catch((err) => {
      throw err;
    });
};
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/movie", movieRoutes);

app.listen(8800, () => {
  connect();
  console.log("connected");
});
