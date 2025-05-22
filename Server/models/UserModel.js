import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY=",
  },
  googleId: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = await mongoose
    .model("User")
    .findById(this._id)
    .select("+password");
  return bcrypt.compare(password, user.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      googleId: this.googleId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
