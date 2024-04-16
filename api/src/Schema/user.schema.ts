import { object, string, TypeOf } from 'zod';

/**
 * Schema for validating user creation input data.
 * It ensures that the request body contains the required fields for creating a user,
 * and validates each field's format and constraints.
 */
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required' // Error message if name is missing
        }),
        password: string({
            required_error: 'Password is required' // Error message if password is missing
        }).min(6, 'Password must be at least 6 characters'), // Enforces minimum password length

        passwordConfirmation: string({
            required_error: 'Password confirmation is required' // Error message if password confirmation is missing
        }),

        email: string({
            required_error: 'Email is required' // Error message if email is missing
        }).email('Not a valid email'), // Validates email format
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match', // Error message if passwords do not match
        path: ['passwordConfirmation'], // Path to the field causing the validation failure
    }),
});

// Define the type for the input data expected by the createUserSchema
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;
