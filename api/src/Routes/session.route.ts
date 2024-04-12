import Express from "express";
import validateResource from "../Middleware/validateResource";
import {createSessionSchema} from "../Schema/session.schema";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
    googleOAuthHandler
} from "../Controllers/session.controller";
import requireUser from "../Middleware/requireUser";

// Routes
const router = Express.Router();
router.post('/',validateResource(createSessionSchema),createUserSessionHandler);
router.get('/',requireUser,getUserSessionsHandler);
router.delete('/',requireUser,deleteSessionHandler);
router.get('/oauth/google',googleOAuthHandler);

export default router;
