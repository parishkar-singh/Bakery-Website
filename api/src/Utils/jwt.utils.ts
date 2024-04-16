import config from "config";
import jwt from "jsonwebtoken";

// Retrieve private and public keys from the configuration
const privateKey: string = config.get('privateKey');
const publicKey: string = config.get('publicKey');

/**
 * Signs a JSON Web Token (JWT) using the private key.
 * @param object The payload to be included in the JWT.
 * @param options Additional options for signing the JWT.
 * @returns The signed JWT.
 */
export function signJWT(object: Object, options?: jwt.SignOptions | undefined): string {
    // Sign the JWT using the private key and RS256 algorithm
    return jwt.sign(object, privateKey, {
        ...(options && options), // Merge additional options if provided
        algorithm: "RS256"
    });
}

/**
 * Verifies a JSON Web Token (JWT) using the public key.
 * @param token The JWT to be verified.
 * @returns An object containing verification results.
 */
export function verifyJWT(token: string) {
    try {
        // Verify the JWT using the public key
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        // Handle JWT verification errors
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: undefined
        };
    }
}
