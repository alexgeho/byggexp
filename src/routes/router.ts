import { Router } from 'express';
import { AuthController } from '../features/users/auth.controller';


const router = Router();
const controller = new AuthController();


router.post('/auth/register', controller.register.bind(controller));
router.post('/auth/login', controller.login.bind(controller));
router.get('/auth/registration-confirmation/:code', controller.confirmation.bind(controller));

export default router;
