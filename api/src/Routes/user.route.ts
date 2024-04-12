import Express from "express";
import validateResource from "../Middleware/validateResource";
import {createUserSchema, verifyUserSchema} from "../Schema/user.schema";
import {createUserHandler, deleteUserHandler, getCurrentUser, verifyUserHandler} from "../Controllers/user.controller";
import requireUser from "../Middleware/requireUser";

const router = Express.Router();

// GET Request
router.get('/me', requireUser,getCurrentUser);
router.post('/',validateResource(createUserSchema),createUserHandler);
// POST Request
router.post('/verify/:id/:verificationCode',validateResource(verifyUserSchema),verifyUserHandler);
// DELETE Request
router.delete('/',deleteUserHandler);
export default router;
