import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

// Routes setup
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
  ]),
  createBlog
);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.patch("/:id", upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "favicon",
    maxCount: 1,
  }]), updateBlog);

export default router;
