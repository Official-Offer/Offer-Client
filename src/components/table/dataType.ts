export interface JobDataType extends IntrinsicAttributes {
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

export interface RecruiterJobDataType extends IntrinsicAttributes {
  // key: string | null;
  // ID: string | null;
  posted_date: string | null;
  title: string | null;
  // address: string;
  company: string | null;
  recruiter: string | null;
  applicants: string | null; //school/total
  verified: boolean | false; // Đã xác thực, chưa xác thực
  // expected: number | 0;
  // accepted: string | 0; //school/total
}

export interface UnapprovedJobDataType extends IntrinsicAttributes {
  // key: string | null;
  // ID: string | null;
  posted_date: string | null;
  title: string | null;
  // address: string;
  company: string | null;
  recruiter: string | null;
  reputation: string | null;
  // expected: number | 0;
  compatibility: string | null; //percentage
}

export interface ApprovedJobDataType extends IntrinsicAttributes {
  // key: string | null;
  // ID: string | null;
  posted_date: string | null;
  title: string | null;
  // address: string;
  company: string | null;
  recruiter: string | null;
  applicants: string | null; //school/total
  // expected: number | 0;
  // accepted: string | 0; //school/total
}

export interface ApplicantDataType extends IntrinsicAttributes {
  // key: string | null;
  // ID: string | null;
  name: string | null;
  school: string | null;
  job: string | null;
  resume: string | null;
  compatibility: string | null; //percentage
  // tag: string | null; //Chua nop / Pending / Da nhan
}

export interface StudentDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  major: string | null;
  resume: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  // jobs_accepted: number | null;
  // tag: string | null;
}

export interface AdvisorCompanyDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  school: string | null;
  role: string | null; 
  // compatibility: string | null;
  email: string | null;
  contacted: string | null; // Đã liên hệ, chưa liên hệ
}

export interface AdvisorSchoolDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null; 
  email_verified: boolean | null;
  role_verified: boolean | null;
  managed_students: string[] | null;
  // tag: string | null;
}

export interface RecruiterSchoolDataType extends IntrinsicAttributes {
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

export interface RecruiterCompanyDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  role: string | null; 
  email_verified: boolean | null;
  role_verified: boolean | null;
  jobs_posted: number | null;
  // tag: string | null;
}

export interface SchoolDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  description: string | "";
  advisors: number | 0;
  no_students: number | null;
  students_applicants: number | 0; // in this company
  unapproved_jobs: number | 0; //in this company
  approved_jobs: number | 0; //in this company
  compatibility: string | null;
  // tag: string | null;
}

export interface CompanyDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  name: string | null;
  description: string | "";
  //Should be changed to images + numbers
  recruiters: number | 0;
  unapproved_jobs: number | 0; // in this school
  approved_jobs: number | 0; // in this school
  student_employees: number | 0; 
  compatibility: string | null;
}

export interface EventRecruiterDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  school: string | null;
  no_attendants: number | null;
  compatibility: string | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

export interface EventAdvisorDataType extends IntrinsicAttributes {
  key: string | null;
  ID: string | null;
  posted_date: string | null;
  title: string | null;
  company: string | null;
  no_attendants: number | null;
  compatibility: string | null;
  tag: string | null; //pending/posted(unapproved)/posted(approved)
}

