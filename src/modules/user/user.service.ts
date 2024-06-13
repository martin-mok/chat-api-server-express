import {
  InternalException,
  UserNotFoundException,
} from '../../exceptions/HttpExceptions';
import { User } from '../../schemas/user.schema';
import { userRepository, UserRepository } from './user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  findById = async (id: string): Promise<User> => {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new UserNotFoundException(id);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new InternalException();
    }
  };

  getAll = async () => {
    return await this.userRepository.getAll();
  };
}

export const userService = new UserService(userRepository);
