import express from "express";
import {
  getProducts,
  getProduct,
  getProductBySlug,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProduct);

export default router;