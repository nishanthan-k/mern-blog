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
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F544%2F753%2Fnon_2x%2Fprofile-icon-design-free-vector.jpg&tbnid=7D07piXWuEFLDM&vet=10CAIQxiAoAGoXChMI6NHcprGShQMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-circle&docid=VagGCmfmEN4lmM&w=980&h=980&itg=1&q=profile%20image&ved=0CAIQxiAoAGoXChMI6NHcprGShQMVAAAAAB0AAAAAEAc",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
