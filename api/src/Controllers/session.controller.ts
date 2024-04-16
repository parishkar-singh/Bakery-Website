import { CookieOptions, Request, Response } from "express";
import { createSession, findSessions, updateSession } from "@/Services/session.service";
import config from "config";
import { signJWT } from "@/Utils/jwt.utils";
import { findAndUpdateUser, getGoogleOauthTokens, getGoogleUser, validatePassword } from "@/Services/user.service";

// Cookie options for access token
const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 minutes
    httpOnly: true,
    domain: config.get<string>('domain'),
    path: '/',
    sameSite: 'strict' as const,
    secure: false
};

// Cookie options for refresh token
const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
};

/**
 * Handler for creating a user session.
 * @param req The request object containing user credentials.
 * @param res The response object.
 * @returns A response with access and refresh tokens.
 */
export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    if (!user) return res.status(401).send("Invalid username or password");

    // Create session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create access token
    const accessToken = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('accessTokenTtl') } // Expires in 15 minutes
    );

    // Create refresh token
    const refreshToken = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('refreshTokenTtl') } // Expires in 1 year
    );

    // Set cookies for tokens
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
}

/**
 * Handler for getting user sessions.
 * @param req The request object.
 * @param res The response object.
 * @returns User sessions.
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid: true });
    return res.send(sessions);
}

/**
 * Handler for deleting a user session.
 * @param req The request object.
 * @param res The response object.
 * @returns A response indicating successful deletion.
 */
export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });

    // Clear the cookies by setting them to null values
    res.cookie("accessToken", null, accessTokenCookieOptions);
    res.cookie("refreshToken", null, refreshTokenCookieOptions);

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}

/**
 * Handler for Google OAuth authentication.
 * @param req The request object.
 * @param res The response object.
 * @returns A redirect response.
 */
export async function googleOAuthHandler(req: Request, res: Response) {
    const code: string = req.query.code as string;
    try {
        const { id_token, access_token } = await getGoogleOauthTokens({ code });
        const googleUser = await getGoogleUser({ id_token, access_token });

        if (!googleUser) return res.status(403).send("Google account is not verified");

        const user = await findAndUpdateUser({ email: googleUser.email }, {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture
        }, { upsert: true, new: true });

        if (!user) return res.status(401).send("Invalid username ");

        const session = await createSession(user._id, req.get("user-agent") || "");

        const accessToken = signJWT(
            { ...user, session: session._id },
            { expiresIn: config.get<string>('accessTokenTtl') } // Expires in 15 minutes
        );

        const refreshToken = signJWT(
            { ...user, session: session._id },
            { expiresIn: config.get<string>('refreshTokenTtl') } // Expires in 1 year
        );

        // Set cookies for tokens
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        // Redirect to callback URL
        res.redirect(`${config.get<string>('origin')}/auth/signin/callback`);
    } catch (e: any) {
        // Redirect to origin if there's an error
        return res.redirect(`${config.get<string>('origin')}`);
    }
}
