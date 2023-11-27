export type User = {
  id: number; // integer
  first_name: string; // with maxLength of 30
  last_name: string; // with maxLength of 30
  email: string; // with minLength of 1 and maxLength of 254
  address: Address;
  role?: string; // Enum with 4 possible values
  self_description?: string;
  gender?: string; // Enum with 3 possible values
  title?: string; // with maxLength of 80
  avatar?: string | null; // string($uri), readOnly, x-nullable
  dob?: string | null; // string($date), x-nullable
  twitter?: string | null; // string($uri), maxLength: 200, x-nullable
  facebook?: string | null; // string($uri), maxLength: 200, x-nullable
  website?: string | null; // string($uri), maxLength: 200, x-nullable
}

export type Address = {
  id: number;
  country?: string; // Optional based on x-nullable
  city: string; // Max length of 80 characters
  district?: string; // Max length of 80 characters, optional
  street?: string; // Max length of 80 characters, optional
  zip_code?: string; // Max length of 80 characters, optional
  province?: string; // Optional with an Enum of values not provided
};

export type School = {
  id: number;
  address: Address;
  name: string; // with minLength of 1 and maxLength of 100
  description?: string | null; // x-nullable
  email: string; // with minLength of 1 and maxLength of 254
  phone?: string | null; // with maxLength of 20, x-nullable
  founded_year?: number | null; // with maximum of 2147483647 and minimum of -2147483648, x-nullable
  logo?: string | null; // readOnly, x-nullable
  email_identifier?: string | null; // with maxLength of 15, x-nullable
  enrollment?: number | null; // with maximum of 2147483647 and minimum of -2147483648, x-nullable
  is_verified: boolean;
  website?: string | null; // with maxLength of 200, x-nullable
  linkedin?: string | null; // with maxLength of 200, x-nullable
  facebook?: string | null; // with maxLength of 200, x-nullable
}

export type Resume = {
  pk: number;
  resume: string;
}

export type Major = {
  id: number;
  name: string;
  disciplines?: number[]
}

export type Student = {
  account: User;
  pk: number; // Title suggests this might represent the "Account" field, you may want to ensure this.
  expected_graduation_date?: string | null; // x-nullable
  school_year?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'master' | 'phd' | null; // Assuming an enum of 6 possible values
  school: School;
  gpa: string; // readOnly
  educations: any[]; // Need the actual structure of this array
  experiences: any[]; // Need the actual structure of this array
  awards: any[]; // Need the actual structure of this array
  projects: any[]; // Need the actual structure of this array
  certifications: any[]; // Need the actual structure of this array
  interests: any[]; // Need the actual structure of this array
  active_resume: Resume; 
}

export type Company = {
  id: number;
  address: Address;
  name: string;
  description: string;
  email: string;
  phone: string;
  email_identifier: string;
  no_employees: number;
  founded_year: number;
  is_verified?: boolean;
  facebook: string;
  linkedin: string;
  website: string;
  logo: string;
  industries: number[];
  followers?: number[];
  ex_interns?: string[];
};

export type Job = {
  pk: number;
  address: Address;
  title: string; // Max length of 100 characters
  level?: string;
  job_type: string;
  work_type: string;
  published: boolean;
  location?: string; // Max length of 100 characters, optional
  lower_salary: number; // Range: -2147483648 to 2147483647
  upper_salary: number; // Range: -2147483648 to 2147483647
  payment_type?: string;
  description?: string; // Optional
  requirement?: string; // Optional
  required_school_year: ('freshman' | 'sophomore' | 'junior' | 'senior' | 'master' | 'phd');
  travel_requirement: boolean;
  travel_support?: boolean; // Optional
  benefits?: string; // Optional
  is_closed: boolean;
  expected_no_applicants: number; // Range: -2147483647 to 2147483647
  created_at: string; // Format: date-time
  updated_at: string; // Format: date-time
  time_posted: string; // Format: date-time
  deadline?: string; // Optional based on x-nullable
  company: Company; // Optional
  contact_person?: number; // Optional
  required_majors: Major[];
  required_skills: number[];
  disciplines: number[];
  request_approval_from: number[];
};