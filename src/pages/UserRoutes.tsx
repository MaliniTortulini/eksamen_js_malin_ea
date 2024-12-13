import { Form, useLoaderData } from "react-router-dom";
import { Tab } from "../components/Tab";
import { CVFormUser } from "../components/CvFormUser";
import { CV } from "../types";
import { useState } from "react";
import { createCV, updateCV, deleteCvById } from "../api/crud";
import { CvBox } from "../components/CvBox";

const UserDashboard = () => {
  const { cvs: initialCvs } = useLoaderData() as { cvs: CV[] };
  const [cvs, setCvs] = useState<CV[]>(initialCvs || []);

  const handleCreateCv = async (newCv: CV) => {
    try {
      const createdCv = await createCV(newCv);
      setCvs((prevCvs) => [...prevCvs, createdCv]);
    } catch (error) {
      console.error("Error creating CV:", error);
    }
  };

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

  const handleDeleteCv = async (uuid: string) => {
    try {
      await deleteCvById(uuid);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv._uuid !== uuid));
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  const hasCv = cvs.length > 0;

  return (
    <Tab label="" defaultChecked>
      {!hasCv && (
        <CVFormUser
          buttonStyle="btn btn-primary"
          intent="createCv"
          title="Create Cv"
          onSuccess={(newCv) => handleCreateCv(newCv)}
        >
          Create CV
        </CVFormUser>
      )}

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
          <div key={cv._uuid}>
            <CvBox
              title={cv?.personalInfo?.name || "CV"}
              data={[
                ...personalInfo,
                ...skills,
                ...education,
                ...experience,
                ...references,
              ]}
            />

            <CVFormUser
              buttonStyle="btn btn-primary"
              intent="updateCv"
              title="Update Cv"
              cv={cv}
              onSuccess={(updatedCv) => handleUpdateCv(cv._uuid, updatedCv)}
            >
              Update CV
            </CVFormUser>

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
          </div>
        );
      })}
    </Tab>
  );
};

export default UserDashboard;
