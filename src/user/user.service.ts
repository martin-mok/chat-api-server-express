import { User } from './user.interface';

const users: User[] = [
  { id: '1', name: 'user_1' },
  { id: '2', name: 'user_2' },
];

export class UserService {
  constructor() {}

  findById = async (id: string) => {
    return users.find((user) => user.id === id);
  };

  getAllUsers = async () => {
    return users;
  };
}

export const userService = new UserService();
