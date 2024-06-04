import express from "express";
import {
  isAdmin,
  isUser,
  isViewer,
} from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/userValidation.middleware.js";
import {
  addMovieValidationSchema,
  paginationValidationSchema,
} from "./movie.validation.js";
import Movie from "./movie.model.js";
import { validateIdFromReqParams } from "../middleware/validate.id.middleware.js";

const router = express.Router();

// add movie
// 1. logged in user must be admin
// 2. validate req.body
// 3. create movie

router.post(
  "/add/movie",
  isAdmin,
  validateReqBody(addMovieValidationSchema),
  async (req, res) => {
    // extract new movie from req.body
    const newMovie = req.body;

    // extract loggedInUserId
    const loggedInUserId = req.loggedInUserId;

    newMovie.adminId = loggedInUserId;

    // convert duration from minutes to "X hr Y min"
    const totalMinutes = newMovie.duration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    newMovie.duration = `${hours} hr ${minutes} min`;

    // create movie
    await Movie.create(newMovie);

    // send res
    return res.status(200).send({ message: "Movie is added successfully." });
  }
);

// get movie details by id
router.post(
  "/movie/details/:id",
  isUser,
  validateIdFromReqParams,
  async (req, res) => {
    // extract movieId from req.params.id
    const movieId = req.params.id;

    // find movie
    const movie = await Movie.findOne({ _id: movieId });

    // if not movie, throw error
    if (!movie) {
      return res.status(404).send({ message: "Movie doesnot exist." });
    }
    // movie.duration = duration / 60;
    //send res
    return res.status(200).send({ message: "success", movieDetails: movie });
  }
);

// edit movie
router.put(
  "/edit/movie/:id",
  isAdmin,
  validateIdFromReqParams,
  validateReqBody(addMovieValidationSchema),
  async (req, res) => {
    // extract movie id from req.params
    const movieId = req.params.id;

    // find movie
    const movie = await Movie.findOne({ _id: movieId });

    // if not movie, throw error
    if (!movie) {
      return res.status(404).send({ message: "Movie doesnot exist." });
    }

    // check movie ownership
    // to be movie owner:  movie adminId must be equal to logged in user id
    const adminId = movie.adminId;

    const loggedInUserId = req.loggedInUserId;

    const isMovieOwner = adminId.equals(loggedInUserId);

    // if not movie owner, throw error
    if (!isMovieOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this movie." });
    }

    // get new values from req.body
    const newValues = req.body;

    // edit product
    await Movie.updateOne(
      { _id: movieId },
      {
        $set: {
          name: newValues.name,
          leadActor: newValues.leadActor,
          supportingActor: newValues.supportingActor,
          country: newValues.country,
          genre: newValues.genre,
          description: newValues.description,
        },
      }
    );

    // send res
    return res.status(200).send({ message: "Movie is updated successfully." });
  }
);

// delete movie
router.delete(
  "/delete/movie/:id",
  isAdmin,
  validateIdFromReqParams,
  async (req, res) => {
    // extract movie id from req.params
    const movieId = req.params.id;

    // find movie
    const movie = await Movie.findOne({ _id: movieId });

    // if not movie, throw error
    if (!movie) {
      return res.status(404).send({ message: "Movie doesnot exist." });
    }

    // check movie ownership
    // to be movie owner:  movie adminId must be equal to logged in user id
    const adminId = movie.adminId;

    const loggedInUserId = req.loggedInUserId;

    const isMovieOwner = adminId.equals(loggedInUserId);

    // if not movie owner, throw error
    if (!isMovieOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this movie." });
    }

    // delete movie
    await Movie.deleteOne({ _id: movieId });

    // send res
    return res.status(200).send({ message: "Movie is deleted successfully." });
  }
);

// list movie by admin
router.post(
  "/movie/list/admin",
  isAdmin,
  validateReqBody(paginationValidationSchema),
  async (req, res) => {
    // extract pagination from req.body
    const { page, limit } = req.body;

    // calculate skip
    const skip = (page - 1) * limit;

    const movies = await Movie.aggregate([
      {
        $match: { adminId: req.loggedInUserId },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: 1,
          leadActor: 1,
          supportingActor: 1,
          country: 1,
          genre: 1,
          description: { $substr: ["$description", 0, 100] },
          image: 1,
          releasedYear: 1,
          duration: 1,
        },
      },
    ]);

    // calculate page
    const totalMovies = await Movie.find({
      adminId: req.loggedInUserId,
    }).countDocuments();

    const totalPages = Math.ceil(totalMovies / limit);

    // send res
    return res
      .status(200)
      .send({ message: "success", movieLists: movies, totalPages });
  }
);

// list movie by viewer
router.post(
  "/movie/list/viewer",
  isViewer,
  validateReqBody(paginationValidationSchema),
  async (req, res) => {
    // extract pagination from req.body
    const { page, limit } = req.body;

    // calculate skip
    const skip = (page - 1) * limit;

    const movies = await Movie.aggregate([
      {
        $match: {},
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: 1,
          leadActor: 1,
          supportingActor: 1,
          country: 1,
          genre: 1,
          description: { $substr: ["$description", 0, 100] },
          image: 1,
          releasedYear: 1,
          duration: 1,
        },
      },
    ]);

    // calculate page
    const totalMovies = await Movie.find().countDocuments();

    const totalPages = Math.ceil(totalMovies / limit);

    // send res
    return res
      .status(200)
      .send({ message: "success", movieLists: movies, totalPages });
  }
);

export default router;
