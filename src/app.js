import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allows all origins
    credentials: true, // Allows credentials to be sent
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import and declare routes for comicBook
import healthServiceRouter from "./routes/healthService.router.js";

// Use the comicBook router for the /comicBook route
app.use("/api/v1/healthService", healthServiceRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).send({ error: "Something went wrong!" });
});

// Log a message indicating the app is running
console.log("App.js is running");


// Export the app instance
export default app;
