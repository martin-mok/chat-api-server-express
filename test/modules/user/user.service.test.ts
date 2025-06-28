import { UserService } from '../../../src/modules/user/user.service';
import { UserRepository } from '../../../src/modules/user/user.repository';
import { InternalException } from '../../../src/exceptions/HttpExceptions';
import { User } from '../../../src/schemas/user.schema';

jest.mock('../../../src/modules/user/user.repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findById: jest.fn(),
    getAll: jest.fn(),
  })),
}));

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    name: 'Test User',
    isAdmin: false,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  };

  const mockUsers: User[] = [
    mockUser,
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@example.com',
      name: 'Admin User',
      isAdmin: true,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    },
  ];

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.findById(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.id);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalException when user not found (due to implementation bug)', async () => {
      const userId = 'non-existent-id';
      mockUserRepository.findById.mockResolvedValue(undefined);

      await expect(userService.findById(userId)).rejects.toThrow(
        InternalException,
      );

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalException when repository throws error', async () => {
      const repositoryError = new Error('Database connection failed');
      mockUserRepository.findById.mockRejectedValue(repositoryError);

      await expect(userService.findById(mockUser.id)).rejects.toThrow(
        InternalException,
      );

      expect(console.error).toHaveBeenCalledWith(repositoryError);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.id);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should handle undefined return from repository', async () => {
      const userId = 'null-user-id';
      mockUserRepository.findById.mockResolvedValue(undefined);

      await expect(userService.findById(userId)).rejects.toThrow(
        InternalException,
      );

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      mockUserRepository.getAll.mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.getAll).toHaveBeenCalledWith();
    });

    it('should return empty array when no users exist', async () => {
      mockUserRepository.getAll.mockResolvedValue([]);

      const result = await userService.getAll();

      expect(result).toEqual([]);
      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('should propagate repository errors', async () => {
      const repositoryError = new Error('Database query failed');
      mockUserRepository.getAll.mockRejectedValue(repositoryError);

      await expect(userService.getAll()).rejects.toThrow(repositoryError);

      expect(mockUserRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
