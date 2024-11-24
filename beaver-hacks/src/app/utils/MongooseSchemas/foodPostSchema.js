import mongoose from "mongoose";

const { Schema, model } = mongoose;

const foodPostSchema = new Schema({
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