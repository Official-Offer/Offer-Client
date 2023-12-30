import { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  Button,
  Card as AntdCard,
  Input,
  Popover,
  Radio,
  Select,
  Slider,
  Space,
} from "antd";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd/lib/radio";
import {
  BuildingOfficeIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import { EventCard, InfoCard } from "@components/card";
import { Carousel } from "@components/list";
import { OfferLogo } from "@components/icons";

import { getStudentDetails } from "@services/apiStudent";
import { getUserDetails } from "@services/apiUser";
import { getJobs, getJobsPerPage } from "@services/apiJob";
import { getCompanyList } from "@services/apiCompany";

import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { useDisplayCompanies } from "@hooks/useDisplayJobs";

import { getPageNumFromUrl } from "@utils/formatters/stringFormat";
import { translateJobType } from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";

const DHBK = {
  name: "Đại Học Bách Khoa Hà Nội",
  cover:
    "https://cafefcdn.com/203337114487263232/2022/9/9/photo-1-1662692607178636727514.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
};

const eventList = [
  {
    name: "HackHer",
    institution: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "",
    commonSchool: [],
    date: new Date("2023-2-27"),
  },
];

const clubList = [
  {
    id: 0,
    name: "Marketing Member",
    institution: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date("2023-2-27"),
    cover:
      "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const scholarshipList = [
  {
    name: "Chancellor's Award",
    institution: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
    date: new Date("2023-2-27"),
    cover:
      "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

//create a next page for the student home page, code below
const Home: NextPage = () => {
  // States
  const {
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
  } = useDisplayJobs();

  const { companies, setCompanies } = useDisplayCompanies();

  const id = getCookie("id");
  const schoolName = decodeURI((getCookie("orgName") as string) ?? "");

  const [school, setSchool] = useState<Record<string, any> | undefined>();
  // const [page, setPage] = useState<number>(1)
  const schoolQuery = useQuery({
    queryKey: ["school"],
    queryFn: getStudentDetails,
    onSuccess: (res) => setSchool(res.school),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
    enabled: id !== undefined,
  });

  const jobInfiniteQuery = useInfiniteQuery({
    queryKey: ["paginated jobs"],
    queryFn: ({ pageParam = 1 }) => getJobsPerPage(pageParam, 12),
    getNextPageParam: (lastPage) => getPageNumFromUrl(lastPage.next),
    refetchOnWindowFocus: false,
  });

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

  const companyQuery = useQuery({
    queryKey: ["companies list"],
    queryFn: getCompanyList,
    onSuccess: (companyData: Record<string, any>) =>
      setCompanies(companyData.results),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleFilter = (filterArr: string[], filterType: number) => {
    // default | 0: job_type, 1: work_type, 2: location
    setFilters((filters: JobFilters) => {
      let filterDict = filters.jobTypes;

      if (filterType === 1) filterDict = filters.workTypes;
      if (filterType === 2) filterDict = filters.locations;

      Object.keys(filterDict).forEach(
        (key) => (filterDict[key] = filterArr.includes(key)),
      );
      return { ...filters };
    });
  };

  const handleFilterSalary = (value: number[]) => {
    setFilters((filters: JobFilters) => {
      const salary = filters.salary;
      salary[0] = value[0];
      salary[1] = value[1];
      return { ...filters };
    });
  };

  const handleSort = (
    event: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent,
  ) => {
    setSort(event.target.value);
  };

  const removeSort = (value: string) => {
    if (value === sort) {
      setSort("");
    }
  };

  const { data: session, status } = useSession();
  // console.log(session);

  // paginate the job list
  return (
    <main className="main">
      <div className="main-content">
        <section>
          <AntdCard
            className={id ? "uni-cover" : "public-hero"}
            cover={id && <img src={DHBK.cover} alt={school?.name ?? ""} />}
            children={
              id ? (
                <div className="uni-wrapper">
                  <div className="uni-logo">
                    {schoolQuery.isLoading ? (
                      <LoadingOutlined />
                    ) : school ? (
                      <img alt={"Logo of " + school.name} src={school.logo} />
                    ) : (
                      <BuildingOffice2Icon />
                    )}
                  </div>
                  <h2 className="uni-title">
                    {schoolName ?? "Trường không xác định"}
                  </h2>
                </div>
              ) : (
                <div>
                  <OfferLogo width={100} height={100} />
                  <div>
                    <h1>Offer</h1>
                    <h3>Tạo một hành trình đến tương lai dành riêng cho bạn</h3>
                  </div>
                </div>
              )
            }
          />
        </section>
        <section>
          <AntdCard className="section-card">
            <h3 className="header">Cơ hội thực tập dành riêng cho bạn</h3>
            {jobInfiniteQuery.hasNextPage ? "T" : "F"}
            {jobInfiniteQuery.fetchNextPage ? "T" : "F"}
            {!jobInfiniteQuery.isError ? (
              <Carousel
                slideSize="full"
                isAsync
                slidesLimit={3}
                isFetching={jobInfiniteQuery.isFetchingNextPage}
                loadNextFunc={
                  jobInfiniteQuery.fetchNextPage
                }
                hasNextSlide={jobInfiniteQuery.hasNextPage}
                viewMoreUrl={"/student/jobs"}
                slides={
                  jobInfiniteQuery.isLoading
                    ? [
                        <div className="layout-grid">
                          {new Array(4).fill(<InfoCard loading />)}
                        </div>,
                      ]
                    : displayedJobs.map((slide) => (
                        <div className="layout-grid">
                          {slide.map((job) => (
                            <InfoCard key={job.id} info={job} />
                          ))}
                        </div>
                      ))
                }
              />
            ) : (
              <p className="error">Server đang bảo trì, vui lòng thử lại sau</p>
            )}
          </AntdCard>
        </section>
        <section>
          <AntdCard className="section-card">
            <h3 className="header">Các công ty hàng đầu</h3>
            <Carousel
              slideSize="quarter"
              slidesToScroll={4}
              showDots
              slides={
                companyQuery.isLoading
                  ? new Array(4).fill(<AntdCard loading />)
                  : companies.map((companyData) => (
                      <AntdCard className="company-card" hoverable>
                        <div className="company-logo">
                          {companyData.logo ? (
                            <img
                              src={companyData.logo}
                              alt={companyData.name}
                            ></img>
                          ) : (
                            <BuildingOfficeIcon />
                          )}
                        </div>
                        <h4 className="company-title">{companyData.name}</h4>
                      </AntdCard>
                    ))
              }
            />
          </AntdCard>
        </section>
      </div>
    </main>
  );
};

export default Home;
