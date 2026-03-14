import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";
import { version } from "node:os";
//import { auth } from "firebase-admin";
import authRoutes from "./api/v1/routes/authRoutes";



const app = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: version()
    });
});


// API Routes
app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);


// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;

