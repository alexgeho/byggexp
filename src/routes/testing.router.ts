import { Request, Response, Router } from 'express';
import {UserModel} from "../features/users/domain/user.model";


export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await Promise.all([

            UserModel.deleteMany({}),
        ]);
        res.json({ message: 'All data deleted' });
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
})
