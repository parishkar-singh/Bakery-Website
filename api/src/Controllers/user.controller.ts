import {Request, Response} from "express";
import logger from "@/Utils/Logger";
import {CreateUserInput} from "@/Schema/user.schema";
import {createUser, deleteAllUsers, findUser} from "@/Services/user.service";

/**
 * Handler for creating a new user.
 * @param req The request object containing user data.
 * @param res The response object.
 * @returns A response containing the created user data or an error message.
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

/**
 * Handler for deleting all users.
 * @param req The request object.
 * @param res The response object.
 * @returns A success status if all users are deleted or an error message.
 */
export async function deleteUserHandler(req: Request, res: Response) {
    try {
        if (await deleteAllUsers()) return res.sendStatus(200).send("All users deleted");
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

/**
 * Handler for getting the current user.
 * @param req The request object.
 * @param res The response object.
 * @returns The current user data.
 */
export async function getCurrentUser(req: Request, res: Response): Promise<any> {
    return res.send(res.locals.user);
}


