import mongoose from "mongoose";
import User from "./userSchema";

const { Schema, model } = mongoose;

const foodPostSchema = new Schema({
    User: String,
    Restaurant: String,
    Title: String,
    Rating: Number,
    TimeStamp: Date,
    Description: String,
    Upvotes: Number,
    Downvotes: Number,
    Comments: Array,
})

const FoodPost = model('FoodPost', foodPostSchema);