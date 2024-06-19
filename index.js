import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import movieRoutes from "./movie/movie.routes.js";
import cors from "cors";
import path from "path";

const app = express();

// to make app undersatnd json
app.use(express.json());

// enable cors
// Cross origin Resource Sharing

const corsOptions = {
  origin: ["https://cinema-two-mu.vercel.app"],
  methods: "GET,PUT,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'src')));


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
