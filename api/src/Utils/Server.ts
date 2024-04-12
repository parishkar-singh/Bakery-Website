import express, {Express} from "express";
import deSerializeUser from "../Middleware/deserializeUser";
import routes from "../routes";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import * as fs from "fs";
import * as path from "path";

function createServer(){
    const app:Express = express();
    //The order of execution of Middleware is important
    app.use(helmet());
    app.use(cors({
        origin: [config.get<string>('origin'),'http://localhost:3000','http://localhost:3001',`http://127.0.0.1` ,'http://127.0.0.1:1430'],
        credentials: true,
    }));
    const parentDir = path.resolve(__dirname, '..');
    const accessLogStream = fs.createWriteStream(path.join(parentDir, 'access.log'), { flags: 'a' });
    app.use(morgan('dev',{ stream: accessLogStream }));
    app.use(cookieParser());
    app.use(express.json())
    app.use(deSerializeUser);
    routes(app);
    return app;
}

export default createServer;
