import { injectable, inject } from 'tsyringe';
import { UserRepository } from './user.repository';
import { EmailManager } from './adapters/email.manager'; // ✅ путь подправь под свой проект
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

@injectable()
export class AuthService {

    constructor(
        private readonly repo: UserRepository,
        private readonly emailManager: EmailManager
    ) {}

    async register(email: string, password: string, role?: string) {

        const existing = await this.repo.findByEmail(email);
        if (existing) throw new Error('User already exists');

        const hashed = await bcrypt.hash(password, 10);
        const emailConfirmationCode = randomUUID();

        const user = await this.repo.create({
            email,
            password: hashed,
            role,
            emailConfirmation: {
                emailConfirmationCode,
                emailConfirmationExpires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            },
        });

        await this.emailManager.sendConfirmationEmail(email, emailConfirmationCode);

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.repo.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return { token};
    }

    async confirmation (code:string) {

        const user = await this.repo.findUserByCode(code);
        if (!user) throw new Error('Invalid code');

        if (user.emailConfirmation?.emailConfirmationExpires && user.emailConfirmation.emailConfirmationExpires < new Date()) {
            throw new Error('Code expired');
        }

        user.emailConfirmation.isEmailConfirmed = true;
        await user.save();


    }
}
