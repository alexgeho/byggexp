import 'reflect-metadata';
import { container } from 'tsyringe';
import { AuthService } from './features/users/auth.service';
import { UserRepository } from './features/users/user.repository';
import { EmailManager } from './features/users/adapters/email.manager';

container.registerSingleton(UserRepository);
container.registerSingleton(EmailManager);
container.registerSingleton(AuthService);

export { container };
