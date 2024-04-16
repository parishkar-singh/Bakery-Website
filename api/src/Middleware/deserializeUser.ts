import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJWT } from "@/Utils/jwt.utils";
import logger from "@/Utils/Logger";
import { reIssueAccessToken } from "@/Services/session.service";
import config from "config";

/**
 * Middleware function to deserialize user information from JWT tokens.
 * If an access token is present in cookies or headers, it verifies and extracts user information.
 * If the access token is expired and a refresh token is present, it reissues a new access token.
 * The user information is stored in res.locals.user for subsequent middleware or route handlers to use.
 * @param req The Express Request object
 * @param res The Express Response object
 * @param next The NextFunction to pass control to the next middleware or route handler
 * @returns Promise<void>
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessToken = get(req, 'cookies.accessToken') || get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken = get(req, 'cookies.refreshToken') || get(req, "headers.x-refresh");

        if (!accessToken) return next(); // If no access token, proceed to next middleware

        const { decoded, expired } = verifyJWT(accessToken);
        if (decoded) {
            // If access token is valid, store user information in res.locals.user and proceed to next middleware
            res.locals.user = decoded;
            return next();
        }

        if (expired && refreshToken) {
            // If access token is expired and refresh token is present, reissue a new access token
            const newAccessToken = await reIssueAccessToken({ refreshToken });
            if (newAccessToken) {
                // If new access token is issued, set it in response headers and cookies
                res.setHeader("x-access-token", newAccessToken);
                res.cookie("accessToken", accessToken, {
                    maxAge: 900000,
                    httpOnly: true,
                    domain: config.get<string>('domain'),
                    path: '/',
                    sameSite: 'strict',
                    secure: false
                });
            }

            // Verify the new access token and store user information in res.locals.user
            const result = verifyJWT(newAccessToken as string);
            res.locals.user = result.decoded;
            return next();
        }

        // If neither access token nor refresh token is present, proceed to next middleware
        return next();
    } catch (e: any) {
        // To Log any errors that occur during the deserialization process
        logger.error(e.message);
    }
}

export default deserializeUser;
