export type JobFilters = {
  jobTypes: string[];
  industries: string;
  locations: string;
  salary: [
    number,
    number
  ];
  yoes: number[];
  datePosted: string;
};