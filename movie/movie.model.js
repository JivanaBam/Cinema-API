import mongoose from "mongoose";

// set schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  leadActor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  supportingActor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Nepal",
      "America",
      "India",
      "Japan",
      "Korea",
      "Spain",
      "France",
      "China",
      "Gremany",
      "England",
      "Australia",
      "Canada",
    ],
  },
  genre: {
    type: [String],
    required: true,
    enum: [
      "comedy",
      "action",
      "horror",
      "science-fiction",
      "drama",
      "thriller",
      "motivational",
      "crime",
      "animation",
      "historical",
      "documentary",
      "romance",
      "adventure",
      "musical",
      "experimental",
      "sports",
      "biography",
      "mystery",
      "spy",
      "war",
      "art",
      "science",
    ],
  },
  adminId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "users",
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    minlength: 100,
  },
  releasedYear: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, //seconds
    required: true,
    min: 1, // Duration should be at least 1 minute
  },
  image: {
    type: String,
    default: null,
    required: false,
  },
  director: {
    type: String,
    trim: true,
    maxlength: 60,
  },
});

// create table
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
