import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'
import { UserDocument } from "./user.model";

// Interface for representing a session document in MongoDB
export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];     // Reference to the user associated with the session
    valid: boolean;                 // Indicates whether the session is valid or not
    userAgent: string;              // User-Agent string associated with the session
    createdAt: Date;                // Timestamp for creation of the session document
    updatedAt: Date;                // Timestamp for last update of the session document
}

// Define Session Schema
const sessionSchema: mongoose.Schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   // Reference to the User model
    valid: { type: Boolean, default: true },                       // Default value for session validity
    userAgent: { type: String },                                   // User-Agent string
}, { timestamps: true });                                          // Auto-generate timestamps for createdAt and updatedAt

// Define SessionModel using Mongoose model
const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
