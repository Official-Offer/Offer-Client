import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Button,
  Input,
  Popover,
  Radio,
  Select,
  Skeleton,
  Slider,
  Space,
} from "antd";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import Split from "react-split";

import { getJobById, getJobsPerPage } from "@services/apiJob";

import { JobFilterNavbar } from "@components/navbar/JobFilterNavbar";
import { JobCard } from "@components/card/JobCard";
import { JobContent } from "@components/content/JobContent";

import { useDisplayJobs } from "@hooks/useDisplayJobs";

import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";

import { replaceUrl } from "@utils/replaceUrl";
import { getPageNumFromUrl } from "@utils/formatters/stringFormat";
import { formatAddress } from "@utils/formatters/stringFormat";

import { TogglableButton } from "@styles/styled-components/styledButton";

const StudentJobs: NextPage = () => {
  const searchParams = useSearchParams();
  const jobId = parseInt(searchParams.get("id") ?? "0");
  const isApplying = searchParams.get("apply") === "true";
  const router = useRouter();

  const display = useDisplayJobs();
  const {
    displayedJobs,
    setJobs,
    setSearchTerm,
    setSelectedJob,
    filters,
    sort,
    setFilters,
    setSort,
  } = display;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobIndexMap, setJobIndexMap] = useState<Map<number, number>>(
    new Map<number, number>(),
  );
  const [activeCardIndex, setActiveCardIndex] = useState<number>(jobId);
  const [jobCardBookmarkClicked, setJobCardBookmarkClicked] =
    useState<boolean>(false);
  const [jobContentBookmarkClicked, setJobContentBookmarkClicked] =
    useState<boolean>(false);

  // Handle fetching jobs

  const setIndexMap = (jobData: Job[][]) => {
    let index = 0;
    for (let i = 0; i < displayedJobs.length; i++) {
      for (let j = 0; j < displayedJobs[i].length; j++) {
        jobIndexMap.set(displayedJobs[i][j].pk, index);
        index++;
      }
    }
    setJobIndexMap(new Map(jobIndexMap));
    setActiveCardIndex(jobIndexMap.get(jobId) ?? 0);
  };

  const jobInfiniteQuery = useInfiniteQuery({
    queryKey: ["paginated jobs"],
    queryFn: async ({ pageParam = 1 }) => {
      const jobList = await getJobsPerPage(pageParam, 10, { applied: false });
      if (!jobId || jobIndexMap.has(jobId)) return jobList;
      const job = await getJobById(jobId);
      if (job) jobList.results.unshift(job);
      setCurrentPage(pageParam);
      return jobList;
    },
    getNextPageParam: (lastPage) => getPageNumFromUrl(lastPage.next),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(jobId)
    setSelectedJob(jobId);
  }, [jobId]);

  useEffect(() => {
    if (jobInfiniteQuery.data) {
      setJobs(
        jobInfiniteQuery.data.pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as Job[],
        ),
      );
      setSort("date-posted");
    }
  }, [jobInfiniteQuery.data]);

  // Handle infinite scrolling

  const loadingWindowRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && displayedJobs[currentPage - 1] && !jobInfiniteQuery.isFetchingNextPage) {
          jobInfiniteQuery.fetchNextPage();
        }
      });
    });
  
    if (loadingWindowRef.current) {
      observer.observe(loadingWindowRef.current);
    }
  
    return () => {
      if (loadingWindowRef.current) {
        observer.unobserve(loadingWindowRef.current);
      }
    };
  });

  // Handle update job page on the side

  useEffect(() => {
    setIndexMap(displayedJobs);
  }, [displayedJobs]);

  const updatePage = (id: number | unknown) => {
    if (typeof id === "number") {
      setActiveCardIndex(jobIndexMap.get(id) ?? 0);
      replaceUrl("id", `${id}`, true);
    }
  };

  // Handle searching and filtering

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleFilterLocation = (locationArr: string[]) => {
    setFilters((filter: JobFilters) => {
      const filterLocations = filter.locations;
      Object.keys(filterLocations).forEach(
        (location) =>
          (filterLocations[location] = locationArr.includes(location)),
      );
      return { ...filter, filterLocations };
    });
  };

  const handleFilterSalary = (value: number[]) => {
    setFilters((filter: JobFilters) => {
      const salary = filter.salary;
      salary[0] = value[0];
      salary[1] = value[1];
      return { ...filter, salary };
    });
  };

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const removeSort = (value: string) => {
    if (value === sort) {
      setSort("");
    }
  };

  return (
    <div>
      <JobFilterNavbar displayHook={display} />
      <Split
        className="split"
        direction="horizontal"
        sizes={[25, 75]}
        minSize={[200, 600]}
      >
        <div className="job-portal-list">
          <ul>
            <li className="job-portal-list-result">
              {jobInfiniteQuery.isLoading
                ? "Đang tải..."
                : `${jobInfiniteQuery?.data?.pages?.[0]?.count ?? "Không có"} kết quả`}
            </li>
            {
              // If the jobs are still loading, show the skeletons
              !jobInfiniteQuery.isLoading && displayedJobs
                ? displayedJobs.flat().map((job: any, index: number) => (
                    <li>
                      <JobCard
                        jobData={job}
                        active={index === activeCardIndex}
                        onClick={() => updatePage(job.pk)}
                        bookmarkClicked={
                          index === activeCardIndex
                            ? jobCardBookmarkClicked
                            : undefined
                        }
                        setBookmarkClicked={
                          index === activeCardIndex
                            ? setJobCardBookmarkClicked
                            : undefined
                        }
                        setJobContentBookmarkClicked={
                          index === activeCardIndex
                            ? setJobContentBookmarkClicked
                            : undefined
                        }
                      />
                    </li>
                  ))
                : !jobInfiniteQuery.isError
                  ? Array(4).fill(
                      <li>
                        <Skeleton className="job-portal-list-loading" active />
                      </li>,
                    )
                  : null
            }
            {
              jobInfiniteQuery.data && jobInfiniteQuery.hasNextPage && (
                <li className="job-portal-infinite-loading" ref={loadingWindowRef}>
                  <LoadingOutlined />
                </li>
              )
            }
          </ul>
        </div>
        <div>
          {!jobInfiniteQuery.isError ? (
            <JobContent
              isLoading={jobInfiniteQuery.isLoading}
              isApplying={isApplying}
              jobData={displayedJobs?.flat()[activeCardIndex]}
              bookmarkClicked={jobContentBookmarkClicked}
              setBookmarkClicked={setJobContentBookmarkClicked}
              setJobCardBookmarkClicked={setJobCardBookmarkClicked}
            />
          ) : (
            <article className="error-page">
              <h1>500</h1>
              <h2>Server đang bảo trì, vui lòng thử lại sau</h2>
            </article>
          )}
        </div>
      </Split>
      {/* <div className="job-portal split-layout no-padding">
      </div> */}
    </div>
  );
};

export default StudentJobs;
