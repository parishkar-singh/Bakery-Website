import Express from "express";
import validateResource from "@/Middleware/validateResource";
import {createSessionSchema} from "@/Schema/session.schema";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionsHandler,
    googleOAuthHandler
} from "@/Controllers/session.controller";
import requireUser from "@/Middleware/requireUser";

// Routes
const router = Express.Router();
// Creates Session
router.post('/',validateResource(createSessionSchema),createUserSessionHandler);
// Gets User
router.get('/',requireUser,getUserSessionsHandler);
// Deletes User
router.delete('/',requireUser,deleteSessionHandler);
// OAuth Route
router.get('/oauth/google',googleOAuthHandler);

export default router;
