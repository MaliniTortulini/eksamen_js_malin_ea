import { CV, User } from "../types/index";

const request = async (url: string, options: RequestInit) => {
  const response = await fetch(`https://crudapi.co.uk/api/v1${url}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_CRUD_API_KEY}`,
    },
    ...options,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};


  // CRUD
const post = async (url: string, data: object) => {
    return request(url, { method: "POST", body: JSON.stringify(data) });
  };
  
  const get = async (url: string) => {
    return request(url, { method: "GET" });
  };
  
  const put = async (url: string, data: object) => {
    return request(url, { method: "PUT", body: JSON.stringify(data) });
  };
  
  const del = async (url: string) => {
    return request(url, { method: "DELETE" });
  };
  
export const createUser = async (user: Partial<User>) => {
  const response = await post("/users", [user]); 
  return response.items[0]; 
};

  export const getUsers = async (): Promise<User[]> => {
    const user = await get("/users");
    return user.items;
  };
  
  export const updateUser = async (
    uuid: string,
    data: Partial<User>
  ): Promise<User> => {
    console.log("Updating User:", { uuid, data });

    const response = await put(`/users/${uuid}`, data);

    console.log("User update response:", response);
    return response.data; 
   
  };
 
  export const deleteUserById = async (_uuid: string) => {
    return del(`/users/${_uuid}`);
  };

  
  // CV
  export const createCV = async (cv: Partial<CV>) => {
    return post("/cvs", [cv]);
  };

  export const getCvs = async (): Promise<CV[]> => {
    const cvs = await get(`/cvs`);
    return cvs.items;
  };

  export const updateCV = async (
    uuid: string,
    data: Partial<CV>
  ): Promise<CV> => {
    console.log("Updating CV:", { uuid, data });

    const response = await put(`/cvs/${uuid}`, data);

    console.log("CV update response:", response);

    return response.data;
  };

  export const deleteCvById = async (uuid: string) => {
    return del(`/cvs/${uuid}`);
  };