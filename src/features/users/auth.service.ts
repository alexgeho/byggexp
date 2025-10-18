import { injectable, inject } from 'tsyringe';
import { UserRepository } from './user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {randomUUID} from "node:crypto";

@injectable()
export class AuthService {

    constructor(@inject(UserRepository) private readonly repo: UserRepository
    ) {}


    async register(email: string, password: string, role: string = 'worker') {

        const existing = await this.repo.findByEmail(email);
        if (existing) throw new Error('User already exists');

        const hashed = await bcrypt.hash(password, 10);

        const emailConfirmationCode = randomUUID()

        const user
            = await this.repo.create({ email, password: hashed, role, emailConfirmationCode });
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
