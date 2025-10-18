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

// Хэширование
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Метод сравнения пароля
UserSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

// Модель
export const UserModel = model<User>('User', UserSchema);
