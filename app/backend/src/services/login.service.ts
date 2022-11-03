import { IUser } from '../interfaces';
import User from '../database/models/Users';
import { createToken } from '../helpers/jwtToken';
import { comparePassword } from '../helpers/bcrypt';

class LoginUserService {
  constructor(private model: typeof User) {}

  async findLogin(user: IUser): Promise<string> {
    const findUser = await this.model.findOne({
      where: { email: user.email },
    });

    if (!findUser) {
      throw new Error('Incorrect email or password');
    }

    const passwordIsValid = comparePassword(user.password, findUser.password);

    if (!passwordIsValid) {
      throw new Error('Incorrect email or password');
    }

    const token = createToken(findUser);
    return token;
  }

  async getRole(userId: string): Promise<string> {
    const findUser = await this.model.findOne({
      where: { id: userId },
    });
    return findUser?.role as string;
  }
}

export default LoginUserService;
