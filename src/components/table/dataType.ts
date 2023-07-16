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
  ID: string | null;
  name: string | null;
  school: string | null;
  major: string | null;
  expected_graduation: string | null;
  tag: string | null;
}

export interface StudentDataType {
  ID: string | null;
  name: string | null;
  school: string | null;
  major: string | null;
  expected_graduation: string | null;
  tag: string | null;
}

export interface SchoolDataType {
  ID: string | null;
  name: string | null;
  noStudents: number | 0;
  noJobs: number | 0;
  tag: string | null;
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

export interface CompanyDataType {
  ID: string | null;
  name: string | null;
  //Should be changed to images + numbers
  recruiters: number | 0;
  unverifiedJobs: number | 0;
  verifiedJobs: number | 0;
  students: number | 0;
  events: number | 0;
}
