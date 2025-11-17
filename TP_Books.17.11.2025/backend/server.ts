import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.ts";
import booksRouter from "./routes/books.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', booksRouter);

app.get("/", (_req, res) => {
    res.json({ message: "Book Tracker API is running!" });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to database", error);
        process.exit(1);
    }
};

startServer();