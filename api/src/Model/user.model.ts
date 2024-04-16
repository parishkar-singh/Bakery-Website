import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'
import crypto from "crypto";

// Generates a random string of specified length using crypto library
function generateRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// Interface for representing input data for User
export interface UserInput {
    email: string;      // User's email address
    name: string;       // User's name
    password: string;   // User's password (hashed)
    picture?: string;   // Optional: User's profile picture URL
}

// Interface extending Mongoose Document, representing a User document
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;    // Timestamp for creation of the User document
    updatedAt: Date;    // Timestamp for last update of the User document

    // Method to compare candidate password with hashed password stored in the User document
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Define User Schema using Mongoose Schema
const userSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },  // User's email address (required, unique)
    name: { type: String, required: true },                // User's name (required)
    password: { type: String, required: true },            // Hashed password (required)
    picture: { type: String },                             // Optional: URL of user's profile picture
}, { timestamps: true });                                   // Auto-generate timestamps for createdAt and updatedAt

// Hash and salt password before saving to database using pre-save hook
userSchema.pre('save', async function (next) {
    let user: UserDocument = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

// Compare password method for User document
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user: UserDocument = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

// Define Mongoose model for User using UserDocument interface and userSchema
const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
