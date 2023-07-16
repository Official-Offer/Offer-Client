export interface UnapprovedJobDataType {
    key: string;
    ID: string;
    date: string;
    title: string;
    address: string;
    schools: number;
    applicants: number;
    tag: string;
}

export interface ApprovedJobDataType {
  key: string;
  ID: string;
  date: string;
  title: string;
  address: string;
  schools: number;
  applicants: number;
  tag: string;
}

export interface UnapprovedJobAdvisorDataType {
  key: string;
  ID: string;
  date: string;
  title: string;
  address: string;
  company: number;
  applicants: string;
  accepted: string;
}

export interface ApprovedJobAdvisorDataType {
  key: string;
  ID: string;
  date: string;
  title: string;
  address: string;
  company: number;
  applicants: string;
  accepted: string;
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