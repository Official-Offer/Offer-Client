export type JobFilters = {
  jobTypes: Record<string, boolean>;
  workTypes: Record<string, boolean>;
  // discipline: number;
  locations: Record<string, boolean>;
  salary: [number, number];
  // yoes: number[];
};

export type CompanyFilters = {
  isVerified: boolean;
};
