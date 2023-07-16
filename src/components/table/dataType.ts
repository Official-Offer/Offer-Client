export interface JobDataType {
  key: string;
  ID: string;
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
  ID: string;
  posted_date: string;
  title: string;
  // address: string;
  company: string;
  no_applicants: number;
  expected: number;
  compatibility: string; //percentage
}

export interface ApprovedJobDataType {
  key: string;
  ID: string;
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
  compatibility: string; //percentage
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
  major: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  jobs_accepted: number | null;
  // tag: string | null;
}

export interface AdvisorSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  major: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  jobs_accepted: number | null;
  // tag: string | null;
}

export interface RecruiterSchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  major: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  jobs_accepted: number | null;
  // tag: string | null;
}

export interface RecruiterCompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  major: string | null;
  expected_graduation: string | null;
  jobs_applied: number | null;
  jobs_accepted: number | null;
  // tag: string | null;
}

export interface SchoolDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  advisors: string | null;
  no_students: number | 0;
  no_employees: number | 0;
  unapproved_jobs: number | 0;
  approved_jobs: number | 0;
  compatibility: string | null;
  // tag: string | null;
}

export interface CompanyDataType {
  key: string | null;
  ID: string | null;
  name: string | null;
  //Should be changed to images + numbers
  recruiters: string | null;
  unverified_jobs: number | 0;
  verifiedJobs: number | 0;
  students: number | 0;
  events: number | 0;
}

export interface EventRecruiterDataType {
  ID: string | null;
  name: string | null;
  noStudents: number | 0;
  noJobs: number | 0;
  tag: string | null;
}

export interface EventAdvisorDataType {
  ID: string | null;
  name: string | null;
  noStudents: number | 0;
  noJobs: number | 0;
  tag: string | null;
}

