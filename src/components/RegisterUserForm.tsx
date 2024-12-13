import { Form } from "react-router-dom";
import { Input } from "./Input";
import { useState } from "react";
import { User } from "../types";
import { createUser, updateUser, getUsers } from "../api/crud";
export const RegisterUserForm = ({
  intent,
  children,
  user,
  title,
  buttonStyle,
  onSuccess,
}: {
  intent: string;
  children: React.ReactNode;
  user?: User;
  title: string;
  buttonStyle?: string;
  onSuccess?: (user: User) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Partial<User> = Object.fromEntries(formData.entries()) as User;

    try {
      const users = await getUsers();
      const emailExists = users.some(
        (u) => u.email === data.email && u._uuid !== user?._uuid
      );

      if (emailExists) {
        setEmailError("Email is already in use.");
        return;
      } else {
        setEmailError("");
      }

      let newUser;
      if (user?._uuid) {
        newUser = await updateUser(user._uuid, data);
      } else {
        newUser = await createUser(data);
      }
      if (onSuccess) {
        onSuccess(newUser);
      }

      setOpen(false);
    } catch (error) {
      console.error("Failed to create/update user:", error);
    }
  };

  return (
    <>
      <button className={buttonStyle} onClick={() => setOpen(true)}>
        {children}
      </button>
      <dialog className="modal" open={open}>
        <div className="modal-box mx-auto max-w-sm">
          <h3 className="text-lg font-bold">{title}</h3>
          <Form method="post" replace onSubmit={handleSubmit}>
            <div className="mx-auto max-w-xs">
              <Input
                name="name"
                defaultValue={user?.name}
                label="Name"
                errorMessage=""
                required
                placeholder="Type here"
              />
              <Input
                name="email"
                defaultValue={user?.email}
                label="Email"
                errorMessage={emailError}
                placeholder="Type here"
              />
              <Input
                name="password"
                defaultValue={user?.password}
                label="Password"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="role"
                defaultValue={user?.role}
                label="Role"
                errorMessage=""
                placeholder="Type here"
              />
              <button
                className="btn btn-outline mr-2"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                name="intent"
                className="btn btn-primary"
                type="submit"
                value={intent}
              >
                Submit
              </button>
              <input hidden name="_uuid" defaultValue={user?._uuid} readOnly />
            </div>
          </Form>
        </div>
      </dialog>
    </>
  );
};
