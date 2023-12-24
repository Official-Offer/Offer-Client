import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { DownOutlined } from "@ant-design/icons";
import Split from "react-split";
import { getJobs } from "@services/apiJob";
import { JobFilterNavbar } from "@components/navbar/JobFilterNavbar";
import { JobCard } from "@components/card/JobCard";
import { JobContent } from "@components/content/JobContent";
import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { TogglableButton } from "@styles/styled-components/styledButton";
import { formatAddress } from "@utils/formatters/stringFormat";
import { replaceUrl } from "@utils/replaceUrl";
import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";

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
    filters,
    sort,
    setFilters,
    setSort,
  } = display;

  const [jobIndexMap, setJobIndexMap] = useState<Map<number, number>>(
    new Map<number, number>(),
  );
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [jobCardBookmarkClicked, setJobCardBookmarkClicked] =
    useState<boolean>(false);
  const [jobContentBookmarkClicked, setJobContentBookmarkClicked] =
    useState<boolean>(false);

  const setIndexMap = (jobData: Job[]) => {
    for (let i = 0; i < displayedJobs.length; i++) {
      jobIndexMap.set(displayedJobs[i].pk, i);
    }
    setJobIndexMap(new Map(jobIndexMap));
    setActiveCardIndex(jobIndexMap.get(jobId) ?? 0);
  };

  const jobQuery = useQuery({
    queryKey: ["jobslist"],
    queryFn: getJobs,
    onSuccess: async (jobData) => {
      // console.log(jobData);
      setJobs(
        jobData.results.sort((a: Job, b: Job) =>
          a.pk === jobId ? -1 : b.pk === jobId ? 1 : 0,
        ),
      );
    },
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIndexMap(displayedJobs);
    replaceUrl(
      "id",
      displayedJobs?.[0]?.pk ? `${displayedJobs[0].pk}` : undefined,
    );
  }, [displayedJobs]);

  const updatePage = (id: number | unknown) => {
    if (typeof id === "number") {
      setActiveCardIndex(jobIndexMap.get(id) ?? 0);
      replaceUrl("id", `${id}`, true);
    }
  };

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
        <div>
          <ul className="job-portal-list">
            <li className="job-portal-list-result">
              {jobQuery.isLoading
                ? "Đang tải..."
                : `${displayedJobs?.length ?? "Không có"} kết quả`}
            </li>
            {
              // If the jobs are still loading, show the skeletons
              !jobQuery.isLoading
                ? displayedJobs.map((job: any, i: number) => (
                    <li>
                      <JobCard
                        jobData={job}
                        active={i === activeCardIndex}
                        onClick={() => updatePage(job.pk)}
                        bookmarkClicked={
                          i === activeCardIndex
                            ? jobCardBookmarkClicked
                            : undefined
                        }
                        setBookmarkClicked={
                          i === activeCardIndex
                            ? setJobCardBookmarkClicked
                            : undefined
                        }
                        setJobContentBookmarkClicked={
                          i === activeCardIndex
                            ? setJobContentBookmarkClicked
                            : undefined
                        }
                      />
                    </li>
                  ))
                : Array(4).fill(
                    <li>
                      <Skeleton className="job-portal-list-loading" active />
                    </li>,
                  )
            }
          </ul>
        </div>
        <div>
          <JobContent
            isLoading={jobQuery.isLoading}
            isApplying={isApplying}
            jobData={displayedJobs?.[activeCardIndex]}
            bookmarkClicked={jobContentBookmarkClicked}
            setBookmarkClicked={setJobContentBookmarkClicked}
            setJobCardBookmarkClicked={setJobCardBookmarkClicked}
          />
        </div>
      </Split>
      {/* <div className="job-portal split-layout no-padding">
      </div> */}
    </div>
  );
};

export default StudentJobs;
