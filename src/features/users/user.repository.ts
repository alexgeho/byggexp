import { injectable } from 'tsyringe';
import { UserModel } from './domain/user.model';

type UserData = {
    email: string;
    password: string;
    role: string;
};

@injectable()
export class UserRepository {
    async findByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    async create(data: UserData) {
        const user = new UserModel(data);
        return user.save();
    }
}
