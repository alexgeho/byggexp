import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Тип юзера
export type User = Document & {

    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    email: string;
    password: string;
    role?: 'superAdmin' | 'companyAdmin' | 'projectAdmin' | 'worker';
    emailConfirmation: {
        isEmailConfirmed: boolean;
        emailConfirmationCode?: string;
        emailConfirmationExpires?: Date;
    };
    createdAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
};

// Схема
const UserSchema = new Schema<User>({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    company: { type: String, required: false },
    phone: { type: String, required: false },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
        type: String,
        enum: ['superAdmin', 'companyAdmin', 'projectAdmin', 'worker'],
        default: 'companyAdmin',
    },

    emailConfirmation: {
        isEmailConfirmed: { type: Boolean, default: false },
        emailConfirmationCode: { type: String },
        emailConfirmationExpires: { type: Date },
    },

    createdAt: { type: Date, default: Date.now },
});


// Модель
export const UserModel = model<User>('User', UserSchema);
