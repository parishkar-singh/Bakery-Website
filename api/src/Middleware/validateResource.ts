import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from "zod";

/**
 * Middleware function to validate request data against a Zod schema.
 * @param schema The Zod schema to validate the request data against
 * @returns A middleware function that parses the request data and validates it against the provided schema
 */
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // Parse and validate request data against the provided schema
        schema.parse({
            body: req.body,     // Request body
            query: req.query,   // Query parameters
            params: req.params, // Route parameters
        });
        next(); // If validation succeeds, proceed to the next middleware or route handler
    } catch (error: any) {
        // If validation fails, send a 400 Bad Request response with the validation error messages
        return res.status(400).send(error.errors);
    }
}

export default validate;
