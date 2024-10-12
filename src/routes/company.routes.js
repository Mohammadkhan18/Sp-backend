import express from "express";
import {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompanyById,
  deleteCompanyById,
} from "../controllers/company.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("logo"), createCompany);

router.get("/:id", getCompanyById);

router.get("/", getAllCompanies);

router.patch("/:id", upload.single("logo"), updateCompanyById);

router.delete("/:id", deleteCompanyById);

export default router;
