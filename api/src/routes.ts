import {Express, Request, Response,NextFunction, Router} from "express";
import healthRoutes from "./Routes/health.route";
import userRoutes from "./Routes/user.route";
import sessionRoutes from "./Routes/session.route";
import updateRoutes from "./Routes/update.route";
import * as path from "path";
function routes(app: Express) {
    const apiRouter = Router();

    // Combine all the Routes
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/sessions', sessionRoutes);
    apiRouter.use('/updates',updateRoutes)

    // Every route in apiRouter will be prefixed with /api
    app.use('/api', apiRouter);
    app.use('/',healthRoutes);
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).sendFile(path.resolve(__dirname, '../src/views/404.html'));
    });
}

export default routes;
