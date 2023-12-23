import { useState, useEffect } from "react";
import { formatAddress } from "@utils/formatters/stringFormat";
import type { Job } from "src/types/dataTypes";
import type { JobFilters, CompanyFilters } from "src/types/filterTypes";
import type { Company } from "src/types/dataTypes";

export const useDisplayJobs = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [originalJobs, setOriginalJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<JobFilters>({
    jobTypes: {},
    workTypes: {},
    // industries: {},
    locations: {},
    salary: [0, 0],
    // yoes: {},
  });
  const [sort, setSort] = useState<string>("");

  const setJobs = (jobList: Job[]) => {
    setOriginalJobs(jobList);
    const filterKeys = Object.keys(filters);
    const newFilters = filters;
    for (let i = 0; i < jobList.length; i++) {
      const job = jobList[i];
      if (job.job_types) {
        const type = job.job_types;
        // if (type !== "{}") newFilters.jobTypes[type] = false;
      }
      if (job.work_types) {
        const type = job.work_types;
        // newFilters.workTypes[type] = false;
      }
      // if (job.industries) {
      //   for (let j = 0; j < job.industries.length; j++) {
      //     const industry = job.industries[j];
      //     newFilters.industries[industry] = false;
      //   }
      // }
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
    console.log(originalJobs);
    const displayed = originalJobs
      .filter((job) => {
        if (
          Object.keys(filters.jobTypes).length !== 0 &&
          !Object.values(filters.jobTypes).every((value) => !value) 
          // && !filters.jobTypes[job.job_type]
        ) {
          return false;
        }
        if (
          Object.keys(filters.workTypes).length !== 0 &&
          !Object.values(filters.workTypes).every((value) => !value) 
          //  && !filters.workTypes[job.work_type]
        ) {
          return false;
        }
        // if (filters.industry && !job.industries.some((industry) => filters.industries[industry])) {
        //   return false;
        // }
        // Locations filter logic: If one is true, filter by that one. If all are false | null, don't filter
        if (
          Object.keys(filters.locations).length !== 0 &&
          !Object.values(filters.locations).every((value) => !value) &&
          !(
            (job.address &&
              filters.locations[formatAddress(job.address, true)]) ||
            (job.company.address &&
              filters.locations[formatAddress(job.company.address, true)])
          )
        ) {
          return false;
        }
        if (
          searchTerm &&
          !job.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
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
      })
      .sort((a: Job, b: Job) => {
        if (sort === "date-posted") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
        if (sort === "date-updated") {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        }
        if (sort === "salary-desc") {
          return b.lower_salary - a.lower_salary;
        }
        if (sort === "salary-asc") {
          return a.lower_salary - b.lower_salary;
        }
        return 0;
      });
    setDisplayedJobs(displayed);
  }, [originalJobs, filters, sort, searchTerm]);

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    displayedJobs,
    setJobs,
    setSearchTerm,
    filters,
    sort,
    setFilters,
    setSort,
  };
};

export const useDisplayCompanies = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [companies, setCompanies] = useState<Company[]>([]);
  return {
    // page,
    // setPage,
    // pageSize,
    // setPageSize,
    companies,
    setCompanies,
  };
};
