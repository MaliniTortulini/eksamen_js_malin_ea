import { createUser, getUsers, updateUser, deleteUserById } from './crud';
import { User } from "../types/index";

global.fetch = jest.fn();

  
describe('CRUD operations', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear(); 
  });
it('should create a user', async () => {
    const mockUser: User = {
      name: 'TestUser',
      email: 'test@example.com',
      password: 'password123',
      role: 'admin',
    };
  
    const mockResponse = {
      _id: '615a5f34ab5c1c1f4ad12345',
      name: 'TestUser',
      email: 'test@example.com',
      role: 'admin',
    };
  

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 201,  
      json: async () => ({ items: mockResponse }),
    });
  
    const result = await createUser(mockUser);
    expect(result).toEqual({ items: mockResponse });
  
    expect(fetch).toHaveBeenCalledWith(
      'https://crudapi.co.uk/api/v1/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockUser),  
      })
    );
  });
  

//   it('should retrieve users', async () => {
//     const mockUsers: User[] = [
//       { id: '1', username: 'TestUser', password: 'password123', role: 'admin' },
//       { id: '2', username: 'AnotherUser', password: 'password456', role: 'user' },
//     ];

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({ items: mockUsers }),
//     });

//     // get users
//     const result = await getUsers();
//     expect(result).toEqual(mockUsers);
//     expect(fetch).toHaveBeenCalledWith('https://crudapi.co.uk/api/v1/users', expect.objectContaining({ method: 'GET' }));
//   });

//   it('should retrieve a user by ID', async () => {
//     const mockUser: User = { id: '1', username: 'TestUser', password: 'password123', role: 'admin' };

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockUser,
//     });

//     const result = await getUserById('1');
//     expect(result).toEqual(mockUser);
//     expect(fetch).toHaveBeenCalledWith('https://crudapi.co.uk/api/v1/users/1', expect.objectContaining({ method: 'GET' }));
//   });

//   it('should update a user', async () => {
//     const mockUser: User = { id: '1', username: 'TestUser', password: 'newpassword', role: 'admin' };

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => mockUser,
//     });

//     const result = await updateUser('1', { password: 'newpassword' });
//     expect(result).toEqual(mockUser);
//     expect(fetch).toHaveBeenCalledWith(
//       'https://crudapi.co.uk/api/v1/users/1',
//       expect.objectContaining({
//         method: 'PUT',
//         body: JSON.stringify({ password: 'newpassword' }),
//       })
//     );
//   });

//   it('should delete a user by ID', async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({}),
//     });

//     const result = await deleteUserById('1');
//     expect(result).toEqual({});
//     expect(fetch).toHaveBeenCalledWith('https://crudapi.co.uk/api/v1/users/1', expect.objectContaining({ method: 'DELETE' }));
//   });
});

