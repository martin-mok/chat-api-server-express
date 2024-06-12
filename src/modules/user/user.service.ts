import { UserNotFoundException } from '../../exceptions/HttpExceptions';
import { userRepository, UserRepository } from './user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  findById = async (id: string) => {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw new UserNotFoundException(id);
    }
  };

  getAll = async () => {
    return await this.userRepository.getAll();
  };
}

export const userService = new UserService(userRepository);
