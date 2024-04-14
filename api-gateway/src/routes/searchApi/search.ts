import express from "express";
import search from "../../controllers/searchApi/search/search";

const router = express.Router();

router.post("/search", search);

export default router;
