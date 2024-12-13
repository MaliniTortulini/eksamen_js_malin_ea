import { createUser, getUsers } from '../api/crud';

const createAdmin = async () => {
  try {
    const users = await getUsers();
    const adminExists = users.some(user => user.role === "admin");

    if (!adminExists) {
      const adminUser = {
        name: "Admin User",
        email: "admin",
        password: "admin",
        role: "admin"
      };

      await createUser(adminUser);
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user: ", error);
  }
};

export default createAdmin;

