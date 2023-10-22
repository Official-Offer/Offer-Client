import { useState, useEffect } from "react";
import type { Job } from "@types/dataTypes";
import type { JobSorts } from "@types/listTypes";

export const useSortJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [sortedJobs, setSortedJobs] = useState<Job[]>(jobs);
  const [sort, setSort] = useState<JobSorts>({
    datePosted: false,
    dateUpdated: false,
    salaryDesc: false,
    salaryAsc: false,
  });

  useEffect(() => {
    const sorted = jobs.sort((a, b) => {
      if (sort.datePosted) {
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
    setSortedJobs(sorted);
  }, [jobs, sort]);

  return {
    sortedJobs,
    setJobs,
    setSort,
  };
}