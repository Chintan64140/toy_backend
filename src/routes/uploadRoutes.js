import express from "express";
import multer from "multer";
import { getProducts, uploadImage } from "../controllers/uploadControllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadImage);
router.get("/", getProducts);

export default router;
