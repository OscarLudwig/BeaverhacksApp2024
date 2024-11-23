import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resturantsSchema = new Schema({
    Name: String,
    Rating: Number,
    NumberOfRatings: Number,
    Description: String,
    // opening and closing hours are arrays with the index being the day starting at 0 for monday
    OpeningHour: [Number],
    ClosingHour: [Number],
    Location: String,
})

const Resturants = model('Resturants', resturantsSchema);