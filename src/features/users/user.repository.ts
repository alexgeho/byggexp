import { injectable } from 'tsyringe';
import { UserModel } from './domain/user.model';


@injectable()
export class UserRepository {

    async findByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    async create(data: any) {
        const user = new UserModel(data);
        return user.save();
    }



    async findUserByCode(code: string) {
        return UserModel.findOne({ 'emailConfirmation.emailConfirmationCode': code  });
    }
}
