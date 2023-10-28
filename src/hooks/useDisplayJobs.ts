import { useState, useEffect } from "react";
import { formatAddress } from "@utils/formatters";
import type { Job } from "@types/dataTypes";
import type { JobFilters } from "@types/listTypes";

export const useDisplayJobs = () => {
  const [originalJobs, setOriginalJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: {},
    industries: {},
    locations: {},
    salary: [],
    // yoes: {},
  });
  const [sort, setSort] = useState<string>("date-posted");

  const setJobs = (jobList: Job[]) => {
    setOriginalJobs(jobList);
    const filterKeys = Object.keys(filters);
    const newFilters = filters;
    for (let i = 0; i < jobList.length; i++) {
      const job = jobList[i];
      if (job.job_types) {
        for (let j = 0; j < job.job_types.length; j++) {
          const type = job.job_types[j];
          newFilters.jobTypes[type] = false;
        }
      }
    }
    for (let i = 0; i < jobList.length; i++) {
      const job = jobList[i];
      if (job.industries) {
        for (let j = 0; j < job.industries.length; j++) {
          const industry = job.industries[j];
          newFilters.industries[industry] = false;
        }
      }
    }
    for (let i = 0; i < jobList.length; i++) {
      const job = jobList[i];
      if (job.address) {
        newFilters.locations[formatAddress(job.address, true)] = false;
      }
      if (job.company.address) {
        newFilters.locations[formatAddress(job.company.address, true)] = false;
      }
    }
    newFilters.salary = [2000, 5000];
    setFilters(newFilters);
  };

  useEffect(() => {
    const displayed = originalJobs.filter((job) => {
      // if (filters.jobType && !job.job_types.some((type) => filters.jobTypes[type])) {
      //   return false;
      // }
      // if (filters.industry && !job.industries.some((industry) => filters.industries[industry])) {
      //   return false;
      // }
      // Locations filter logic: If one is true, filter by that one. If all are false | null, don't filter
      if (
        filters.locations && 
        Object.keys(filters.locations).length !== 0 &&
        !Object.values(filters.locations).every((value) => !value) &&
        !((job.address && filters.locations[formatAddress(job.address, true)]) || (job.company.address && filters.locations[formatAddress(job.company.address, true)]))
      ) {
        return false;
      }
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // if (filters.salary.length > 0) {
      //   const [min, max] = filters.salary;
      //   if (min && job.salary < min) {
      //     return false;
      //   }
      //   if (max && job.salary > max) {
      //     return false;
      //   }
      // }
      return true;
    }).sort((a, b) => {
      if (sort === "date-posted") {
        return new Date(b.time_posted).getTime() - new Date(a.time_posted).getTime();
      }
      if (sort.dateUpdated) {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      if (sort.salaryDesc) {
        return b.salary - a.salary;
      }
      if (sort.salaryAsc) {
        return a.salary - b.salary;
      }
      return 0;
    });
    setDisplayedJobs(displayed);
  }, [originalJobs, filters, sort, searchTerm]);

  return {
    displayedJobs,
    setJobs,
    setSearchTerm,
    filters,
    sort,
    setFilters,
    setSort,
  };
}