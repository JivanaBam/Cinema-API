import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import movieRoutes from "./movie/movie.routes.js";
import cors from "cors";

const app = express();

// to make app undersatnd json
app.use(express.json());

// enable cors
// Cross origin Resource Sharing

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// database connection
connectDB();

// register routes
app.use(userRoutes);
app.use(movieRoutes);

//network and sever connection
const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});