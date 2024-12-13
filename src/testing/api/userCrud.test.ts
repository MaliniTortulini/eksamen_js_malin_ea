import { createUser, getUsers, updateUser, deleteUserById } from '../api/_test_crud'; 

global.fetch = jest.fn(); 
describe("User Endpoints", () => {
  it("should create a new user and return 201", async () => {
    const mockResponse = {
      status: 201,
      items: [{
        _id: "123",
        name: "Hanna Hansen",
        email: "HannaH@gmail.com",
        role: "user"
      }],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockResponse,
      ok: true,
      status: 201,
    });

    const response = await createUser({
      name: "Hanna Hansen",
      email: "HannaH@gmail.com",
      password: "password123",
      role: "user",
    });

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/users", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        name: "Hanna Hansen",
        email: "HannaH@gmail.com",
        password: "password123",
        role: "user",
      }),
      headers: expect.objectContaining({
        "Content-type": "application/json",
        "Authorization": expect.stringContaining("Bearer"),
      }),
    }));

    expect(response).toHaveProperty("name", "Hanna Hansen");
    expect(response).toHaveProperty("email", "HannaH@gmail.com");
  });

  it("should fetch users and return 200", async () => {
    const mockUsers = {
      items: [{
        _id: "123",
        name: "Hanna Hansen",
        email: "HannaH@gmail.com",
        role: "user"
      }, {
        _id: "321",
        name: "Ole Larsen",
        email: "Ole@gmail.com",
        role: "admin"
      }],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockUsers,
      ok: true,
      status: 200,
    });

    const users = await getUsers();

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/users", expect.objectContaining({
      method: "GET",
      headers: expect.objectContaining({
        "Content-type": "application/json",
        "Authorization": expect.stringContaining("Bearer"),
      }),
    }));

    expect(users).toHaveLength(2); 
    expect(users[0]).toHaveProperty("name", "Hanna Hansen");
  });

  it("should update a user and return 200", async () => {
    const mockUpdatedUser = {
      data: {
        _id: "135",
        name: "Hanna Hansen",
        email: "HannaH@gmail.com",
        role: "user"
      },
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockUpdatedUser,
      ok: true,
      status: 200,
    });

    const response = await updateUser("123", {
      name: "Hanna Hansen",
      email: "HannaH@gmail.com",
    });

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/users/123", expect.objectContaining({
      method: "PUT",
      body: JSON.stringify({
        name: "Hanna Hansen",
        email: "HannaH@gmail.com",
      }),
      headers: expect.objectContaining({
        "Content-type": "application/json",
        "Authorization": expect.stringContaining("Bearer"),
      }),
    }));

    expect(response).toHaveProperty("name", "Hanna Hansen");
  });

  it("should delete a user and return 200", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),  
    });

    const response = await deleteUserById("123");

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/users/123", expect.objectContaining({
      method: "DELETE",
      headers: expect.objectContaining({
        "Authorization": expect.stringContaining("Bearer"),
        "Content-type": "application/json",
      }),
    }));

    expect(response).toEqual({});
  });
});
