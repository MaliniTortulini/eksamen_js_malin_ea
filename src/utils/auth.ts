import { AuthProvider } from "../types";
import { getUsers } from "../api/crud";

export const AdminAuthProvider: AuthProvider = {
  email: null,

  isAuthenticated() {
    const session = localStorage.getItem("auth");
    return session ? true : false;
  },

  getRole() {
    const session = localStorage.getItem("auth");
    if (!session) return null;

    const { role } = JSON.parse(session);
    return role;
  },

  getCurrentUser() {
    const session = localStorage.getItem("auth");
    return session ? JSON.parse(session) : null;
  },


  async login(email: string, password: string) {
    const users = await getUsers()
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    AdminAuthProvider.email = email;
    localStorage.setItem("auth", JSON.stringify({ email: user.email, role: user.role, id: user._uuid }));
  },

  async logout() {
    await new Promise((res) => setTimeout(res, 500));
    AdminAuthProvider.email = null;
    localStorage.removeItem("auth");
  },
};
