export interface JobDataType {
  key: string;
  ID: string | null;
  posted_date: string;
  title: string;
  unapproved_schools: number; 
  approved_schools: number;
  no_applicants: number;
  expected: number;
  // tag: string; -> TODO: promoted/unpromoted tags once launched
}

export interface UnapprovedJobDataType {
  key: string;
  ID: string | null;
  posted_date: string;
  title: string;
  // address: string;
  company: string;
  no_applicants: number;
  expected: number;
  compatibility: number | 0; //percentage
}

export interface ApprovedJobDataType {
  key: string;
  ID: string | null;
  posted_date: string;
  title: string;
  // address: string;
  company: string;
  no_applicants: string; //school/total
  expected: number;
  accepted: number; // from this school only
}

export interface ApplicantDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  school: string | null;
  major: string | null;
  expected_graduation: string | null;
  compatibility: number | 0; //percentage
  tag: string | null;
}

export interface StudentDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  major: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  jobs_accepted: number | null;
  // tag: string | null;
}

export interface AdvisorCompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  school: string | null;
  role: string | null; 
  // compatibility: number | 0;
  contacted: string | null; // Đã liên hệ, chưa liên hệ
  email: string | null;
}

export interface AdvisorSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null; 
  email_verified: boolean | null;
  role_verified: boolean | null;
  managed_students: string | null;
  // tag: string | null;
}

export interface RecruiterSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null;
  company: string | null;
  // compatibility: number | 0; 
  jobs_posted: number | null; // in this school
  email: string | null;
  contacted: string | null; // Đã liên hệ, chưa liên hệ
}

export interface RecruiterCompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null; 
  email_verified: boolean | null;
  role_verified: boolean | null;
  jobs_posted: number | null;
  // tag: string | null;
}

export interface SchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  advisors: string | null;
  no_students: number | 0;
  no_employees: number | 0; 
  unapproved_jobs: number | 0; //in this company
  approved_jobs: number | 0; //in this company
  compatibility: number | 0;
  // tag: string | null;
}

export interface CompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  //Should be changed to images + numbers
  recruiters: string | null;
  unapproved_jobs: number | 0; // in this school
  approved_jobs: number | 0; // in this school
  student_employees: number | 0; 
  compatibility: number | 0;
}

export interface EventRecruiterDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  name: string | null;
  school: string | null;
  no_attendants: number | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

export interface EventAdvisorDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  name: string | null;
  company: string | null;
  no_attendants: number | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

