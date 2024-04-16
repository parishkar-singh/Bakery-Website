import Express, {Router} from "express";
import validateResource from "@/Middleware/validateResource";
import {createUserSchema} from "@/Schema/user.schema";
import {createUserHandler, deleteUserHandler, getCurrentUser} from "@/Controllers/user.controller";
import requireUser from "@/Middleware/requireUser";

const router:Router = Router();

// Get logged User
router.get('/me', requireUser,getCurrentUser);
// Creates the User
router.post('/',validateResource(createUserSchema),createUserHandler);
// DELETE Request
router.delete('/',deleteUserHandler);
export default router;
