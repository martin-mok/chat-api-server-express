import { Group } from './modules/group/group.interface';
// import { User } from './modules/user/user.interface';

// export const users: User[] = [
//   { id: '1', name: 'user_1' },
//   { id: '2', name: 'user_2' },
//   { id: '3', name: 'user_3' },
//   { id: '4', name: 'user_4' },
// ];

export const groups: Group[] = [
  {
    id: '1',
    name: 'group_1',
    users: [
      { id: '1', name: 'user_1' },
      { id: '2', name: 'user_2' },
    ],
  },
  {
    id: '2',
    name: 'group_2',
    users: [
      { id: '2', name: 'user_2' },
      { id: '3', name: 'user_3' },
    ],
  },
];
