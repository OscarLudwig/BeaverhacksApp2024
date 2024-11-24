import mongoose from "mongoose";

const { Schema, model } = mongoose;

const foodPostSchema = new Schema({
    Title: String,
    Rating: Number,
    Description: String,
    Upvotes: Number,
    Downvotes: Number,
    Comments: Array,
})

const FoodPost = model('FoodPost', foodPostSchema);