import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fblank%2520profile%2520picture%2F&psig=AOvVaw3LikqU6Pe14cTyy194Z6Re&ust=1711474412722000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDJrZX5j4UDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
