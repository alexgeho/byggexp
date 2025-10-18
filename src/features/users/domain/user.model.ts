import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
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
        emailConfirmationExpires: { type: Date }
    },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
