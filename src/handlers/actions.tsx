import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { AdminAuthProvider } from "../utils/auth";
import { ROUTES } from "../config/router";
import {
  createUser,
  updateUser,
  deleteUserById,
  updateCV,
  createCV,
  deleteCvById,
} from "../api/crud";
import { Education, Experience, PersonalInfo, Reference } from "../types";
import { parseJSON } from "../utils/parseJSON";

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string;

  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  }

  try {
    await AdminAuthProvider.login(email, password);
  } catch {
    return {
      error: "Wrong email or password",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || ROUTES.ROOT);
};

export const logoutAction = async () => {
  await AdminAuthProvider.logout();
  return redirect(ROUTES.ROOT);
};

export const adminAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const _uuid = formData.get("_uuid") as string | null;
  const userId = (formData.get("userId") as string | null) ?? undefined;
  const personalInfo = parseJSON<PersonalInfo>(
    formData.get("personalInfo") as string | null,
    { name: "", email: "", phone: "" }
  );
  const skills = parseJSON<string[]>(
    formData.get("skills") as string | null,
    []
  );
  const education = parseJSON<Education[]>(
    formData.get("education") as string | null,
    []
  );
  const experience = parseJSON<Experience[]>(
    formData.get("experience") as string | null,
    []
  );
  const references = parseJSON<Reference[]>(
    formData.get("references") as string | null,
    []
  );
  const other = parseJSON<string[]>(formData.get("other") as string | null, []);

  const intent = formData.get("intent") as string | null;
  if (!intent) {
    return { error: "Intent is required" };
  }

  try {
    // User
    if (intent === "createUser") {
      if (!name || !email || !password || !role) {
        return { error: "All fields are required for creating a user" };
      }
      const newUser = await createUser({ name, email, password, role });
      return { ok: true, user: newUser };
    }

    if (intent === "updateUser") {
      if (!_uuid) {
        return { error: "User UUID is required for updating" };
      }
      const updatedUser = await updateUser(_uuid, {
        name,
        email,
        password,
        role,
      });
      return { ok: true, user: updatedUser };
    }

    if (intent === "deleteUser") {
      if (!_uuid) {
        return { error: "User UUID is required for deleting" };
      }
      await deleteUserById(_uuid);
      return { ok: true };
    }

    // CV
    if (intent === "createCv") {
      const newCv = await createCV({
        userId,
        personalInfo,
        skills,
        education,
        experience,
        references,
        other,
        _uuid: "",
      });
      return { status: 201, ok: true, cv: newCv };
    }

    if (intent === "updateCv") {
      if (!_uuid) {
        return { error: "Cv UUID is required for updating" };
      }
      const updatedCv = {
        personalInfo,
        skills,
        education,
        experience,
        references,
        other,
      };
      const result = await updateCV(_uuid, updatedCv);
      return { ok: true, cv: result };
    }

    if (intent === "deleteCv") {
      if (!_uuid) {
        return { error: "Cv UUID is required for deleting" };
      }
      await deleteCvById(_uuid);
      return { ok: true };
    }

    return { error: `Unsupported intent: ${intent}` };
  } catch (error) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Error occurred",
    };
  }
};
