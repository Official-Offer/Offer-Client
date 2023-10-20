export type Address = {
  id: number;
  country: string;
  city: string | null;
  street: string | null;
  zip_code: string | null;
  province: string | null;
};

export type Company = {
  id: number;
  address: Address | null;
  name: string;
  description: string;
  email: string;
  phone: string;
  email_identifier: string;
  no_employees: number | null;
  founded_year: number | null;
  is_verified: boolean;
  facebook: string | null;
  linkedin: string | null;
  website: string | null;
  logo: string | null;
  industries: string[];
  followers: any[]; // Assuming it's an array of some type
  ex_interns: any[]; // Assuming it's an array of some type
};

export type Job = {
  pk: number;
  job_types: string[];
  title: string;
  description: string;
  is_closed: boolean;
  expected_no_applicants: number | null;
  created_at: string;
  updated_at: string;
  time_posted: string | null;
  deadline: string | null;
  company: Company;
  created_by: User;
  contact_person: User;
  required_majors: string[];
  required_skills: string[];
  disciplines: any[]; // Assuming it's an array of some type
  questionnaire: number;
};