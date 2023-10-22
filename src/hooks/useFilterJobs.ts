import { useState, useEffect } from "react";
import type { Job } from "@types/dataTypes";
import type { JobFilter } from "@types/listTypes";

export const useFilterJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<JobFilter>({
    jobTypes: [],
    industries: [],
    locations: [],
    salary: [],
    yoes: [],
  });

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      if (filter.jobType && !filter.jobTypes.some((jobType) => job.job_types.includes(jobType))) {
        return false;
      }
      if (filter.industries.length > 0 && !filter.industries.some((industry) => job.company.industries.includes(industry))) {
        return false;
      }
      if (filter.locations.length > 0 && !filter.locations.some((location) => job.company.address.city === location)) {
        return false;
      }
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filter.salary.length > 0) {
        const [min, max] = filter.salary;
        if (min && job.salary < min) {
          return false;
        }
        if (max && job.salary > max) {
          return false;
        }
      }
      return true;
    });
    setFilteredJobs(filtered);
  }, [jobs, filter, searchTerm]);

  return {
    filteredJobs,
    setJobs,
    setSearchTerm,
    setFilter,
  };
}