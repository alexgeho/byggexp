import { injectable, inject } from 'tsyringe';
import { UserRepository } from './user.repository';
import { EmailManager } from './adapters/email.manager'; // ✅ путь подправь под свой проект
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

@injectable()
export class AuthService {
    constructor(
        @inject(UserRepository) private readonly repo: UserRepository,
        @inject(EmailManager) private readonly emailManager: EmailManager // ✅ внедрили EmailManager
    ) {}

    async register(email: string, password: string, role: string = 'worker') {
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
                emailConfirmationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 часа
            },
        });

        // ✅ Отправка письма
        await this.emailManager.sendConfirmationEmail(email, emailConfirmationCode);

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.repo.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        return { token, role: user.role };
    }
}
