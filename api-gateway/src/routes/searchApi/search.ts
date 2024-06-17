import express from "express";
import search from "../../controllers/searchApi/search/search";
import { mustBeAuthenticated } from "../../middlewares/mustBeAuthenticated";

const router = express.Router();

router.post("/search", mustBeAuthenticated, search);

export default router;
