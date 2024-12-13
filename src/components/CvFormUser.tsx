import { Form } from "react-router-dom";
import { Input } from "./Input";
import { useState, useEffect } from "react";
import { CV, User } from "../types";
import { createCV, getUsers, updateCV } from "../api/crud";

export const CVFormUser = ({
  intent,
  children,
  cv,
  title,
  buttonStyle,
  onSuccess,
}: {
  intent: string;
  children: React.ReactNode;
  cv?: CV;
  title: string;
  buttonStyle?: string;
  onSuccess?: (cv: CV) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await getUsers();
        setLoggedInUser(user[0]);
      } catch (error) {
        console.error("Error fetching logged in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Partial<CV> = {
      personalInfo: {
        name: loggedInUser?.name || "",
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
      },
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim()),
      education: [
        {
          institution: formData.get("institution") as string,
          degree: formData.get("degree") as string,
          year: formData.get("year") as string,
        },
      ],
      experience: [
        {
          title: formData.get("title") as string,
          company: formData.get("company") as string,
          years: formData.get("years") as string,
        },
      ],
      references: [
        {
          refName: formData.get("refName") as string,
          contactInfo: formData.get("contactInfo") as string,
        },
      ],
      other: formData.get("other")
        ? (formData.get("other") as string).split(",").map((o) => o.trim())
        : [],
      userId: loggedInUser?._uuid || "",
    };

    try {
      let updatedCV;
      if (cv) {
        updatedCV = await updateCV(cv._uuid, data);
      } else {
        updatedCV = await createCV(data);
      }
      if (onSuccess) {
        onSuccess(updatedCV);
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to create/update CV:", error);
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
                defaultValue={
                  cv ? cv.personalInfo?.name : loggedInUser?.name || ""
                }
                label="Name"
                errorMessage=""
                placeholder="Type here"
                readOnly
              />

              <Input
                name="email"
                defaultValue={cv?.personalInfo?.email || ""}
                label="Email"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="phone"
                defaultValue={cv?.personalInfo?.phone || ""}
                label="Phone"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="skills"
                defaultValue={cv?.skills?.join(", ") || ""}
                label="Skills"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="institution"
                defaultValue={cv?.education?.[0]?.institution || ""}
                label="Institution"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="degree"
                defaultValue={cv?.education?.[0]?.degree || ""}
                label="Degree"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="year"
                defaultValue={cv?.education?.[0]?.year || ""}
                label="Year"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="title"
                defaultValue={cv?.experience?.[0]?.title || ""}
                label="Title"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="company"
                defaultValue={cv?.experience?.[0]?.company || ""}
                label="Company"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="years"
                defaultValue={cv?.experience?.[0]?.years || ""}
                label="Years"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="refName"
                defaultValue={cv?.references?.[0]?.refName || ""}
                label="Reference Name"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="contactInfo"
                defaultValue={cv?.references?.[0]?.contactInfo || ""}
                label="Contact Info"
                errorMessage=""
                placeholder="Type here"
              />
              <Input
                name="other"
                defaultValue={cv?.other?.join(", ") || ""}
                label="Other"
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
              <input hidden name="_uuid" defaultValue={cv?._uuid} readOnly />
            </div>
          </Form>
        </div>
      </dialog>
    </>
  );
};
