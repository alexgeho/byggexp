import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {AuthService} from './auth.service';
import {RegistrationDTO} from "./DTO/registration.dto";

export class AuthController {

    private service = container.resolve(AuthService);

    async register(req: Request, res: Response) {
        try {
            const dto: RegistrationDTO = req.body;
            const user = await this.service.register(dto);
            res.status(201).json({message: 'User created', user});
        } catch (e: any) {
            res.status(400).json({error: e.message});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const result = await this.service.login(email, password);

            res
                .header('Authorization', `Bearer ${result.token}`)
                .status(200)
                .json({ message: 'Login successful' });



        } catch (e: any) {
            res.status(400).json({error: e.message});
        }
    }

    async confirmation(req: Request, res: Response) {
        try {
            const {code} = req.params;

            const result = await this.service.confirmation(code);

            res.send(`
  <html>
    <head><title>Email confirmed</title></head>
    <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
      <h1 style="color: green;">✅ Email successfully confirmed!</h1>
      <p>You are welcome now.</p>
    </body>
  </html>
`);


        } catch (e: any) {
            res.status(400).json({error: e.message});
        }
    }
}
