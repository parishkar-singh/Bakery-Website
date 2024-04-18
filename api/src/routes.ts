import { Express, Request, Response, NextFunction, Router } from "express";
import healthRoutes from "@/Routes/health.route";
import userRoutes from "@/Routes/user.route";
import sessionRoutes from "@/Routes/session.route";
import ingredientsRoutes from "@/Routes/ingredients.route";
import recipesRoutes from "@/Routes/recipe.route";
import * as path from "path";
import {populate} from "dotenv";
import {populateDatabase} from "@/Database/Populate.Database";

function routes(app: Express): void {
    const apiRouter: Router = Router();

    // Combine all the Routes
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/sessions', sessionRoutes);
    apiRouter.use('/ingredients', ingredientsRoutes)
    apiRouter.use('/recipes', recipesRoutes);
    apiRouter.use('/populate',populateDatabase)

    // Every route in apiRouter will be prefixed with /api
    app.use('/api', apiRouter);
    app.use('/', healthRoutes);
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.status(404).sendFile(path.resolve(__dirname, '../src/views/404.html'));
    });
}

export default routes;
