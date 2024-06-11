import { groups } from '../../fakeTestData';

export class GroupService {
  constructor() {}

  findById = async (id: string) => {
    return groups.find((group) => group.id === id);
  };

  getAll = async () => {
    return groups;
  };
}

export const groupService = new GroupService();
