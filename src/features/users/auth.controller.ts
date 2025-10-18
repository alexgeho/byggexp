import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthService } from './auth.service';

export class AuthController {

    private service = container.resolve(AuthService);

    async register(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;
            const user = await this.service.register(email, password, role);
            res.status(201).json({ message: 'User created', user });
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.service.login(email, password);
            res.json(result);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }
}
