import UserModel, { UserDocument, UserInput } from "../Model/user.model";
import { omit } from "lodash";
import config from "config";
import qs from 'querystring'
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import axios from "axios";
import logger from "../Utils/Logger";

// Interface for the Google OAuth token response
interface GoogleTokenResult {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
}

// Interface for the Google User profile
interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

/**
 * Creates a new user in the database.
 * @param input - User input data.
 * @returns The created user object with sensitive fields omitted.
 */
export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}

/**
 * Deletes all users and their associated sessions from the database.
 * @returns Boolean indicating the success of deletion.
 */
export async function deleteAllUsers() {
    try {
        await UserModel.deleteMany({});
        return true;
    } catch (e: any) {
        throw new Error(e);
    }
}

/**
 * Validates user credentials.
 * @param email - User's email address.
 * @param password - User's password.
 * @returns User object if credentials are valid, otherwise false.
 */
export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
}

/**
 * Finds a user based on the provided query.
 * @param query - Query to filter users.
 * @returns The found user object.
 */
export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}

/**
 * Finds and updates a user based on the provided query and update fields.
 * @param query - Query to filter users.
 * @param update - Fields to update in the user document.
 * @param options - Query options.
 * @returns The updated user object.
 */
export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    return UserModel.findOneAndUpdate(query, update, options).lean();
}

/**
 * Retrieves Google OAuth tokens using the authorization code.
 * @param code - Authorization code from Google OAuth.
 * @returns GoogleTokenResult object containing access token details.
 */
export async function getGoogleOauthTokens({ code }: { code: string }): Promise<GoogleTokenResult> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: config.get<string>('googleClientId'),
        client_secret: config.get<string>('googleClientSecret'),
        redirect_uri: config.get<string>('googleAuthRedirect'),
        grant_type: 'authorization_code',
    }
    try {
        const res = await axios.post<GoogleTokenResult>(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Google token exchange failed');
    }
}

/**
 * Retrieves Google user profile using the ID token and access token.
 * @param id_token - ID token from Google OAuth.
 * @param access_token - Access token from Google OAuth.
 * @returns GoogleUser object containing user profile details.
 */
export async function getGoogleUser({ id_token, access_token }: { id_token: string, access_token: string }): Promise<GoogleUser> {
    try {
        const res = await axios.get<GoogleUser>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })
        return res.data;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to fetch Google user (USER SERVICE ERROR)');
    }
}
