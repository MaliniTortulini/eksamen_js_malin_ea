import { createCV, getCvs, updateCV, deleteCvById } from './_test_crud';

global.fetch = jest.fn();

describe("CV Endpoints", () => {
    it("should create a new CV and return 201", async () => {
        const mockResponse = {
          status: 201,
          items: [{
            _uuid: "123",
            userId: "user123",
            personalInfo: {
              name: "Hanna Hansen",
              email: "HannaH@gmail.com",
              phone: "12345678"
            },
            skills: ["JavaScript", "React"],
          }],
        };
      
        (fetch as jest.Mock).mockResolvedValue({
          json: async () => mockResponse,
          ok: true,
          status: 201,
        });
      
        const response = await createCV({
          userId: "user123",
          personalInfo: {
            name: "Hanna Hansen",
            email: "HannaH@gmail.com",
            phone: "12345678",
          },
          skills: ["JavaScript", "React"],
        });
      
        expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/cvs", expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            userId: "user123",
            personalInfo: {
              name: "Hanna Hansen",
              email: "HannaH@gmail.com",
              phone: "12345678",
            },
            skills: ["JavaScript", "React"],
          }),
          headers: expect.objectContaining({
            "Content-type": "application/json",
            "Authorization": expect.stringContaining("Bearer"),
          }),
        }));
      
        expect(response.items[0]).toHaveProperty("_uuid", "123");
        expect(response.items[0]).toHaveProperty("personalInfo.name", "Hanna Hansen");
      });
  
  it("should fetch CVs and return 200", async () => {
    const mockCvs = {
      items: [{
        _uuid: "123",
        userId: "user123",
        personalInfo: {
          name: "Hanna Hansen",
          email: "HannaH@gmail.com",
          phone: "123-456-7890"
        },
        skills: ["JavaScript", "React"],
      }, {
        _uuid: "456",
        userId: "user456",
        personalInfo: {
          name: "Ole Larsen",
          email: "Ole@gmail.com",
          phone: "3216547"
        },
        skills: ["Node.js", "Express"],
      }],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockCvs,
      ok: true,
      status: 200,
    });

    const cvs = await getCvs();

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/cvs", expect.objectContaining({
      method: "GET",
      headers: expect.objectContaining({
        "Content-type": "application/json",
        "Authorization": expect.stringContaining("Bearer"),
      }),
    }));

    expect(cvs).toHaveLength(2);
    expect(cvs[0]).toHaveProperty("personalInfo.name", "Hanna Hansen");
  });

  it("should update a CV and return 200", async () => {
    const mockUpdatedCV = {
      data: {
        _uuid: "123",
        userId: "user123",
        personalInfo: {
          name: "Hanna Hansen",
          email: "HannaH@gmail.com",
          phone: "12345678"
        },
        skills: ["JavaScript", "React", "TypeScript"],
      },
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockUpdatedCV,
      ok: true,
      status: 200,
    });

    const response = await updateCV("123", {
      skills: ["JavaScript", "React", "TypeScript"],
    });

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/cvs/123", expect.objectContaining({
      method: "PUT",
      body: JSON.stringify({
        skills: ["JavaScript", "React", "TypeScript"],
      }),
      headers: expect.objectContaining({
        "Content-type": "application/json",
        "Authorization": expect.stringContaining("Bearer"),
      }),
    }));

    expect(response).toHaveProperty("skills", expect.arrayContaining(["JavaScript", "React", "TypeScript"]));
  });

  it("should delete a CV and return 200", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    const response = await deleteCvById("123");

    expect(fetch).toHaveBeenCalledWith("https://crudapi.co.uk/api/v1/cvs/123", expect.objectContaining({
      method: "DELETE",
      headers: expect.objectContaining({
        "Authorization": expect.stringContaining("Bearer"),
        "Content-type": "application/json",
      }),
    }));

    expect(response).toEqual({});
  });
});
