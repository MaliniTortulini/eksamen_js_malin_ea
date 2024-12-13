export type User = {
    _uuid:string;
    name: string;
    email: string;
    password: string;
    role: string;
    };
    
export type PersonalInfo = {
    name: string; 
    email: string; 
    phone: string; 
};

export type Education = {
    institution: string;
    degree: string; 
    year: string;
};

export type Experience = {
    title: string;
    company: string;
    years: string;
}

export type Reference = {
    refName: string;
    contactInfo: string; 
};


export type CV = {
_uuid: string;
userId: string;
personalInfo: PersonalInfo;
skills?: string[];
education?: Education[];
experience?: Experience[];
references?: Reference[];
other?: string[];
};

export type NavElementsType = {
    name: string;
    route: string;
  };

  export type AuthProvider = {
    isAuthenticated(): boolean;
    getRole(): string | null; 
    email: string | null;
    login(email: string, password: string): Promise<void>; 
    logout(): Promise<void>;
    getCurrentUser: () => { email: string; role: string; id: string } | null;
  };
  