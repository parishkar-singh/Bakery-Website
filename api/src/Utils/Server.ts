import express, { Express } from "express";
import deSerializeUser from "../Middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import * as fs from "fs";
import * as path from "path";

/**
 * Creates and configures the Express server.
 *
 * @returns The configured Express application instance.
 */
function createServer(): Express {
    const app: Express = express();

    // Security middleware to set HTTP headers for enhanced security
    app.use(helmet());

    // Middleware for enabling Cross-Origin Resource Sharing (CORS)
    app.use(cors({
        origin: [config.get<string>('origin'), 'http://localhost:3000', 'http://localhost:3001', `http://127.0.0.1`, 'http://127.0.0.1:1430'],
        credentials: true,
    }));

    // Directory for storing access logs
    const parentDir = path.resolve(__dirname, '..');
    const accessLogStream = fs.createWriteStream(path.join(parentDir, 'access.log'), { flags: 'a' });

    // Middleware for logging HTTP requests
    app.use(morgan('dev', { stream: accessLogStream }));

    // Middleware for parsing cookies
    app.use(cookieParser());

    // Middleware for parsing JSON request bodies
    app.use(express.json());

    // Custom middleware for deserializing user information from tokens
    app.use(deSerializeUser);

    // Mounting routes defined in the 'routes.ts' module
    routes(app);
    // Returns the Express App instance
    return app;
}

export default createServer;
