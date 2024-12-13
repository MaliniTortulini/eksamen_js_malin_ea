import { UserTable } from "../components/UserTable";
import { Form, useLoaderData } from "react-router-dom";
import { Tab } from "../components/Tab";
import { RegisterUserForm } from "../components/RegisterUserForm";
import { CVForm } from "../components/CvFormAdmin"
import { CV, User } from "../types";
import { useEffect, useState } from "react";
import {
  deleteUserById,
  updateUser,
  updateCV,
  deleteCvById,
} from "../api/crud";
import { CvBox } from "../components/CvBox";

const Admin = () => {
  const { users: initialUsers } = useLoaderData() as { users: User[] };
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { cvs: initialCvs } = useLoaderData() as { cvs: CV[] };
  const [cvs, setCvs] = useState<CV[]>(initialCvs || []);

  const handleCreateUser = async (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleCreateCv = async (newCv: CV) => {
    setCvs((prevCvs) => [...prevCvs, { ...newCv, userId: newCv.userId || newCv._uuid }]);
  };
  
  const handleUpdateUser = async (uuid: string, updatedData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(uuid, updatedData);  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._uuid === uuid ? { ...user, ...updatedUser } : user  
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    users.forEach(async (user) => {
      const userCv = cvs.find((cv) => cv.userId === user._uuid);
      if (userCv && user.name !== userCv.personalInfo.name) {
        const updatedCvData = {
          ...userCv,
          personalInfo: {
            ...userCv.personalInfo,
            name: user.name,
          },
        };
        try {
          const updatedCv = await updateCV(userCv._uuid, updatedCvData);
          setCvs((prevCvs) =>
            prevCvs.map((cv) => (cv._uuid === userCv._uuid ? updatedCv : cv))
          );
        } catch (cvError) {
          console.error("Error updating CV:", cvError);
        }
      }
    });
  }, [users, cvs]);
  
  const handleUpdateCv = async (uuid: string, updatedData: Partial<CV>) => {
    try {
      const updatedCv = await updateCV(uuid, updatedData); 
      setCvs((prevCvs) =>
        prevCvs.map((cv) => (cv._uuid === uuid ? { ...cv, ...updatedCv } : cv))
      );
    } catch (error) {
      console.error("Error updating CV:", error);
    }
  };
  
  const handleDeleteUser = async (uuid: string) => {
    try {
      await deleteUserById(uuid);
      setUsers((prevUsers) => prevUsers.filter((user) => user._uuid !== uuid));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteCv = async (uuid: string) => {
    try {
      await deleteCvById(uuid);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv._uuid !== uuid));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <div role="tablist" className="tabs tabs-lifted tabs-lg mt-7">
        <Tab label="Cv's" defaultChecked>
          <CVForm
            buttonStyle="btn btn-primary"
            intent="createCv"
            title="Create Cv"
            onSuccess={(newCv) => handleCreateCv(newCv)}
          >
            Create CV
          </CVForm>

          {cvs.map((cv) => {
            const personalInfo = [
              { label: "Name", value: cv?.personalInfo?.name || "N/A" },
              { label: "Email", value: cv?.personalInfo?.email || "N/A" },
              { label: "Phone", value: cv?.personalInfo?.phone || "N/A" },
            ];

            const skills = [{ label: "Skills", value: cv?.skills || "N/A" }];

            const education = [
              {
                label: "Institution",
                value: cv?.education?.[0]?.institution || "N/A",
              },
              { label: "Degree", value: cv?.education?.[0]?.degree || "N/A" },
              { label: "Year", value: cv?.education?.[0]?.year || "N/A" },
            ];

            const experience = [
              { label: "Title", value: cv?.experience?.[0]?.title || "N/A" },
              {
                label: "Company",
                value: cv?.experience?.[0]?.company || "N/A",
              },
              { label: "Years", value: cv?.experience?.[0]?.years || "N/A" },
            ];

            const references = [
              {
                label: "Reference Name",
                value: cv?.references?.[0]?.refName || "N/A",
              },
              {
                label: "Contact Info",
                value: cv?.references?.[0]?.contactInfo || "N/A",
              },
            ];

            return (
              <>
                <CvBox
                  key={cv._uuid}
                  title={cv?.personalInfo?.name || "CV"}
                  data={[
                    ...personalInfo,
                    ...skills,
                    ...education,
                    ...experience,
                    ...references,
                  ]}
                />
                <CVForm
                  buttonStyle="btn btn-primary"
                  intent="updateCv"
                  title="Update Cv"
                  cv={cv}
                  onSuccess={(updatedCv) => handleUpdateCv(cv._uuid, updatedCv)}
                >
                  Update CV
                </CVForm>

                <Form method="post" replace>
                  <button
                    className="btn ml-6"
                    type="submit"
                    name="intent"
                    value="deleteCv"
                    onClick={() => handleDeleteCv(cv._uuid)}
                  >
                    Delete
                  </button>

                  <input
                    type="text"
                    name="_uuid"
                    value={cv._uuid}
                    hidden
                    readOnly
                  />
                </Form>
              </>
            );
          })}
        </Tab>

        <Tab label="Users" defaultChecked>
          <RegisterUserForm
            buttonStyle="btn btn-primary"
            intent="createUser"
            title="Create User"
            onSuccess={(newUser) => handleCreateUser(newUser)}
          >
            Register new user
          </RegisterUserForm>

          <UserTable headers={["Name", "Email", "Password", "Role"]}>
            {users.map((user) => (
              <tr key={user._uuid}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td className="flex justify-end">
                  <RegisterUserForm
                    buttonStyle="btn"
                    intent="updateUser"
                    user={user}
                    title="Update User"
                    onSuccess={(updatedUser) =>
                      handleUpdateUser(user._uuid, updatedUser)
                    }
                  >
                    Update
                  </RegisterUserForm>

                  <Form method="post" replace>
                    <button
                      className="btn ml-6"
                      type="submit"
                      name="intent"
                      value="deleteUser"
                      onClick={() => handleDeleteUser(user._uuid)}
                    >
                      Delete
                    </button>

                    <input
                      type="text"
                      name="_uuid"
                      value={user._uuid}
                      hidden
                      readOnly
                    />
                  </Form>
                </td>
              </tr>
            ))}
          </UserTable>
        </Tab>
      </div>
    </div>
  );
  
};

export default Admin;
