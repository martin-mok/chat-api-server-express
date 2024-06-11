import { User } from '../user/user.interface';

export class Group {
  id: string;
  name?: string;
  users: User[];
}
