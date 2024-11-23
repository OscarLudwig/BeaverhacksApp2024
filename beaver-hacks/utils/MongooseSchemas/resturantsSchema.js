import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resturantsSchema = new Schema({
    Name: String,
    Rating: Number,
    NumberOfRatings: Number,
    Description: String,
    OpeningHour: Number,
    ClosingHour: Number,
    Location: String,
})

const Resturants = model('Resturants', resturantsSchema);