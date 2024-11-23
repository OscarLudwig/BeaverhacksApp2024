import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({
  Username: String,
  Password: String,
  OSUverified: Boolean,
  CreatedDate: Date,
  Email: String,
  FirstName: String,
  LastName: String,
});

const User = model('User', blogSchema);
export default User;