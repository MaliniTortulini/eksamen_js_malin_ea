import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { AdminAuthProvider } from "../utils/auth";
import { getCvs, getUsers } from "../api/crud";
import { CV, User } from "../types";

export const RootLoader = () => {
  const role = AdminAuthProvider.getRole();
  return { user: AdminAuthProvider.email, role };
};

export const LoginLoader = () => {
  if (AdminAuthProvider.isAuthenticated()) {
    const role = AdminAuthProvider.getRole();
    return redirect(role === "admin" ? "/admin" : "/user");
  }
  return null;
};

export const matchUsersWithCvs = (users: User[], cvs: CV[]) => {
  return users.map((user) => {
    const userCvs = cvs.filter((cv) => cv.userId === user._uuid);
    return { ...user, cvs: userCvs };
  });
};

export const AdminLoader = async ({ request }: LoaderFunctionArgs) => {
  if (!AdminAuthProvider.isAuthenticated() || AdminAuthProvider.getRole() !== "admin") {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);  
    return redirect("/login?" + params.toString());
  }

  const users = await getUsers(); 
  const cvs = await getCvs();
  return { users, cvs };  
};

export const UserLoader = async ({ request }: LoaderFunctionArgs) => {
  const currentUser = AdminAuthProvider.getCurrentUser();

  if (!currentUser || currentUser.role !== "user") {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const users = await getUsers();
  const user = users.find((u) => u._uuid === currentUser.id);

  if (!user) {
    return { error: "User not found" };
  }

  const cvs = await getCvs();
  const userCvs = cvs.filter((cv) => cv.userId === user._uuid);

  return { user, cvs: userCvs };
};
