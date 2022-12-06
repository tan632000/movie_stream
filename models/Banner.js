import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", BannerSchema);
