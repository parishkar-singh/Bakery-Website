import {Request, Response} from "express";
import logger from "@/Utils/Logger";
import {CreateUserInput, VerifyUserInput} from "@/Schema/user.schema";
import {createUser, deleteAllUsers, findUser} from "@/Services/user.service";
import sendMail from "@/Utils/Mailer";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

export async function deleteUserHandler(req: Request, res: Response) {
    try {
        if (await deleteAllUsers()) return res.sendStatus(200).send("All users deleted");
    } catch (e: any) {
        logger.error(e);
        return res.status(400).send(e.message);
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    return res.send(res.locals.user);
}

export async function getCurrentUserApp(req: Request, res: Response) {
    return res.send(res.locals.user);
}
