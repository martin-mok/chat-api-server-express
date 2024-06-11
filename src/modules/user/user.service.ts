import { users } from '../../fakeTestData';

export class UserService {
  constructor() {}

  findById = async (id: string) => {
    return users.find((user) => user.id === id);
  };

  getAll = async () => {
    return users;
  };
}

export const userService = new UserService();
