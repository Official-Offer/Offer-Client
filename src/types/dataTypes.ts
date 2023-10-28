export type Address = {
  id: number;
  country?: string; // Optional based on x-nullable
  city: string; // Max length of 80 characters
  district?: string; // Max length of 80 characters, optional
  street?: string; // Max length of 80 characters, optional
  zip_code?: string; // Max length of 80 characters, optional
  province?: string; // Optional with an Enum of values not provided
};

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
  required_majors: number[];
  required_skills: number[];
  disciplines: number[];
  request_approval_from: number[];
};