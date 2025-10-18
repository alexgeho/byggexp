import { Router } from 'express';
import { AuthController } from '../features/users/auth.controller';


const router = Router();
const controller = new AuthController();


router.post('/auth/register', controller.register.bind(controller));
router.post('/auth/login', controller.login.bind(controller));

export default router;
