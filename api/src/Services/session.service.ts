import SessionModel, {SessionDocument} from "@/Model/session.model";
import {FilterQuery, UpdateQuery} from "mongoose";
import {get} from 'lodash';
import {signJWT, verifyJWT} from "@/Utils/jwt.utils";
import {findUser} from "./user.service";
import config from "config";
/**
 * Creates a new session for the user.
 * @param userId - ID of the user associated with the session.
 * @param userAgent - User agent string.
 * @returns The created session object.
 */
export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}

/**
 * Finds sessions based on the provided query.
 * @param query - Query to filter sessions.
 * @returns Array of session objects.
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

/**
 * Updates sessions based on the provided query and update fields.
 * @param query - Query to filter sessions.
 * @param update - Fields to update in the session document.
 * @returns The result of the update operation.
 */
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

/**
 * Reissues an access token using the provided refresh token.
 * @param refreshToken - Refresh token.
 * @returns The reissued access token.
 */
export async function reIssueAccessToken({ refreshToken }: { refreshToken: any }) {
    // Decode Refresh Token
    const { decoded } = verifyJWT(refreshToken);
    if (!decoded || !get(decoded, 'session')) return false;
    // Get Session
    const session = await SessionModel.findById(get(decoded, "session"));
    if (!session || !session.valid) return false;
    // Get User
    const user = await findUser({ _id: session.user });
    if (!user) return false;
    const accessToken = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('accessTokenTtl') } // Lives around 69 minutes
    );
    return accessToken;
}