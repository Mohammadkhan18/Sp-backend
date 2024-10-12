import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors("*"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Route to serve a file by its name
app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/uploads", filename);

  // Use res.sendFile to serve the file
  res.sendFile(filePath, (err) => {
    if (err) {
      res
        .status(err.status || 500)
        .json({ message: "File not found", error: err.message });
    }
  });
});


//routes import
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import blogRouter from "./routes/blog.routes.js";


//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/blogs", blogRouter);

export { app };
