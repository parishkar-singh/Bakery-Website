import {Express, Request, Response, NextFunction, Router} from "express";
import healthRoutes from "@/Routes/health.route";
import userRoutes from "@/Routes/user.route";
import sessionRoutes from "@/Routes/session.route";
import ingredientsRoutes from "@/Routes/ingredients.route";
import * as path from "path";

function routes(app: Express): void {
    const apiRouter: Router = Router();

    // Combine all the Routes
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/ingredients',ingredientsRoutes)
    apiRouter.use('/sessions', sessionRoutes);

    // Every route in apiRouter will be prefixed with /api
    app.use('/api', apiRouter);
    app.use('/', healthRoutes);
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.status(404).sendFile(path.resolve(__dirname, '../src/views/404.html'));
    });
}

export default routes;
