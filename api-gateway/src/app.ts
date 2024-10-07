import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import "dotenv/config";

import mainApiTrackRouter from "./routes/mainApi/track";
import mainApiArtistRouter from "./routes/mainApi/artist";
import mainApiAlbumRouter from "./routes/mainApi/album";
import searchApiSearchRouter from "./routes/searchApi/search";
import authServerAuthRouter from "./routes/authServer/auth"
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: "*",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use(authServerAuthRouter);
app.use(mainApiTrackRouter);
app.use(mainApiArtistRouter);
app.use(mainApiAlbumRouter);
app.use(searchApiSearchRouter);

app.get("/", async (req, res) => {
  res.send("Rhythmicity");
});

app.get("/health-check", (req, res) => {
  res.send("Everything is alright!😉");
});

app.use(errorHandler);

app.listen(port, () => {
  if (!process.env.NGINX_IP) {
    console.error("Error: NGINX_IP not defined");
    process.exit(1);
  }
  console.log(`API Gateway is serving at http://localhost:${port}`);
});
