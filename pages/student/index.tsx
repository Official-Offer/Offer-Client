import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { useQuery } from "@tanstack/react-query";
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
import { DownOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { EventCard, InfoCard } from "@components/card";
import { getStudentDetails } from "@services/apiStudent";
import { getUserDetails } from "@services/apiUser";
import { getJobs } from "@services/apiJob";
import { getCompanyList } from "@services/apiCompany";
import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { useDisplayCompanies } from "@hooks/useDisplayJobs";
import { translateJobType } from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";
import type { RadioChangeEvent } from "antd/lib/radio";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
  const {
    companies,
    setCompanies,
  } = useDisplayCompanies();

  const jobQuery = useQuery({
    queryKey: ["jobs list"],
    queryFn: getJobs,
    onSuccess: (jobData: Record<string, any>) => setJobs(jobData.results),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const companyQuery = useQuery({
    queryKey: ["companies list"],
    queryFn: getCompanyList,
    onSuccess: (companyData: Record<string, any>) => setCompanies(companyData.results),
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
  console.log(session);

  // paginate the job list
  return (
    <main className="main">
      <div className="main__content">
        <section>
          <AntdCard
            className="uni-cover"
            cover={<img src={DHBK.cover} alt={DHBK.name} />}
            children={
              <div className="cover-spacing">
                <div className="card-logo">
                  <img alt={"Logo of " + DHBK.name} src={DHBK.logo} />
                </div>
                <div className="logo-spacing"></div>
                <h2>{DHBK.name}</h2>
              </div>
            }
          />
        </section>
        <section>
          <h2 className="header">Cơ hội thực tập dành riêng cho bạn</h2>
          <div className="layout-grid" >
            {jobQuery.isLoading
              ? new Array(4).fill(<InfoCard loading />)
              : displayedJobs.map((jobData) => <InfoCard info={jobData} />)}
          </div>
        </section>
        <section>
          <h2 className="header">Các công ty hàng đầu</h2>
          <div className="layout-grid" >
            {companyQuery.isLoading
              ? new Array(4).fill(<InfoCard loading />)
              : companies.map((companyData) => <div><img src={companyData.logo}></img>{companyData.name}</div>)}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
