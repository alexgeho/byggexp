import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Тип юзера
export type User = Document & {
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
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['superAdmin', 'companyAdmin', 'projectAdmin', 'worker'],
        required: false,
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
