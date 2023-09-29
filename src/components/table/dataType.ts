export interface JobDataType {
  // key: string | null;
  // ID: string | null;
  posted_date: string | null;
  title: string | null;
  unapproved_schools: string | "";
  approved_schools: string | "";
  applicants: number | 0;
  // no_applicants: number | 0;
  // expected: number | 0;
  // tag: string; -> TODO: promoted/unpromoted tags once launched
}

export interface UnapprovedJobDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  // address: string;
  company: string | null;
  recruiter: string | null;
  expected: number | 0;
  compatibility: string | null; //percentage
}

export interface ApprovedJobDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  // address: string;
  company: string | null;
  recruiter: string | null;
  applicants: string | null; //school/total
  expected: number | 0;
  accepted: string | 0; //school/total
}

export interface ApplicantDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  school: string | null;
  major: string | null;
  expected_graduation: string | null;
  compatibility: string | null; //percentage
  tag: string | null; //Chua nop / Pending / Da nhan
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
  // compatibility: string | null;
  email: string | null;
  contacted: string | null; // Đã liên hệ, chưa liên hệ
}

export interface AdvisorSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null; 
  email_verified: boolean | null;
  role_verified: boolean | null;
  managed_students: string[] | null;
  // tag: string | null;
}

export interface RecruiterSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  company: string | null;
  role: string | null;
  // compatibility: string | null; 
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
  advisors: number | 0;
  no_students: number | null;
  students_applicants: number | 0; // in this company
  unapproved_jobs: number | 0; //in this company
  approved_jobs: number | 0; //in this company
  compatibility: string | null;
  // tag: string | null;
}

export interface CompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  //Should be changed to images + numbers
  recruiters: number | 0;
  unapproved_jobs: number | 0; // in this school
  approved_jobs: number | 0; // in this school
  student_employees: number | 0; 
  compatibility: string | null;
}

export interface EventRecruiterDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  school: string | null;
  no_attendants: number | null;
  compatibility: string | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

export interface EventAdvisorDataType {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  company: string | null;
  no_attendants: number | null;
  compatibility: string | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

