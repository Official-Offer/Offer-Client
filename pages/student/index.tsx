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
  Form,
  notification,
} from "antd";
import { DownOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd/lib/radio";
import { BuildingOfficeIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";

import { EventCard, InfoCard, NewsEventCard } from "@components/card";
import { Carousel } from "@components/list";
import { OfferLogo } from "@components/icons";

import { getStudentDetails, postContactEmail } from "@services/apiStudent";
import { getUserDetails } from "@services/apiUser";
import { getJobsPerPage } from "@services/apiJob";
import { getCompanyList } from "@services/apiCompany";

import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { useDisplayCompanies } from "@hooks/useDisplayJobs";

import { getPageNumFromUrl } from "@utils/formatters/stringFormat";
import { translateJobType } from "@utils/formatters/translateFormat";
import type { Job } from "src/types/dataTypes";
import type { JobFilters } from "src/types/filterTypes";

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
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
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
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const newsEventList = [
  {
    id: 1,
    title: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    description: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    content: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    image: "https://newtecons.vn/wp-content/uploads/2021/08/fulbright.jpg",
    date: new Date("2023-2-27"),
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 2,
    title: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    description: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    content: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    image: "https://newtecons.vn/wp-content/uploads/2021/08/fulbright.jpg",
    date: new Date("2023-2-27"),
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 3,
    title: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    description: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    content: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    image: "https://newtecons.vn/wp-content/uploads/2021/08/fulbright.jpg",
    date: new Date("2023-2-27"),
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 4,
    title: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    description: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    content: "Học bổng Fulbright 2022: Cơ hội du học Mỹ cho sinh viên Việt Nam",
    image: "https://newtecons.vn/wp-content/uploads/2021/08/fulbright.jpg",
    date: new Date("2023-2-27"),
    location: "TP. Hồ Chí Minh",
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
  const [contactEmail, setContactEmail] = useState<string>("");
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
    queryFn: ({ pageParam = 1 }) => getJobsPerPage(pageParam, 12, { applied: false }),
    getNextPageParam: (lastPage) => getPageNumFromUrl(lastPage.next),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (jobInfiniteQuery.data) {
      setJobs(
        jobInfiniteQuery.data.pages.reduce((acc, page) => [...acc, ...page.results], [] as Job[])
      );
      setSort("date-posted");
    }
  }, [jobInfiniteQuery.data]);

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

      Object.keys(filterDict).forEach((key) => (filterDict[key] = filterArr.includes(key)));
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

  const handleSort = (event: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent) => {
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
            cover={id && <img src={school?.background_image} alt={school?.name ?? ""} />}
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
                  <h2 className="uni-title">{schoolName ?? "Trường không xác định"}</h2>
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
            {!jobInfiniteQuery.isError ? (
              <Carousel
                slideSize="full"
                isAsync
                slidesLimit={3}
                isFetching={jobInfiniteQuery.isFetchingNextPage}
                loadNextFunc={jobInfiniteQuery.fetchNextPage}
                hasNextSlide={jobInfiniteQuery.hasNextPage}
                viewMoreUrl={"/student/jobs"}
                slides={
                  jobInfiniteQuery.isLoading
                    ? [<div className="layout-grid">{new Array(4).fill(<InfoCard loading />)}</div>]
                    : displayedJobs.map((slide) => (
                        <div className="layout-grid">
                          {slide?.map((job: Job) => <InfoCard key={job.pk} info={job} />)}
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
            <h3 className="header">Sự kiện dành riêng cho bạn</h3>
            <Carousel
              slideSize="half"
              slidesToScroll={2}
              showDots
              slides={
                companyQuery.isLoading
                  ? new Array(2).fill(<AntdCard loading />)
                  : [
                      <EventCard info={eventList[0]} />,
                      <EventCard info={eventList[0]} />,
                      <EventCard info={eventList[0]} />,
                      <EventCard info={eventList[0]} />,
                    ]
              }
            />
          </AntdCard>
        </section>

        <section>
          <AntdCard className="section-card">
            <h3 className="header">Tin tức nổi bật</h3>
            <Carousel
              slideSize="half"
              slidesToScroll={2}
              showDots
              slides={
                companyQuery.isLoading
                  ? new Array(2).fill(<AntdCard loading />)
                  : newsEventList.map((newsEvent) => <NewsEventCard newsEvent={newsEvent} />)
              }
            />
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
                            <img src={companyData.logo} alt={companyData.name}></img>
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
        <section>
          <div className="profile-contact">
            <div className="profile-contact-info">
              <h2>Bạn muốn hỗ trợ đăng tuyển? Liên hệ với chúng tôi tại đây</h2>
              <form
                className="profile-contact-form"
                onSubmit={(event) => {
                  event.preventDefault(); // Prevents the default form submission behavior
                  console.log(contactEmail); // You can perform other actions here
                  postContactEmail(contactEmail).then((res) => {
                    console.log(res);
                    // noti
                    notification.success({
                      message: "Gửi email thành công",
                      description: "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể",
                    });
                  }).catch((err) => {
                    console.log(err);
                    notification.error({
                      message: "Có lỗi xảy ra",
                      description: "Vui lòng thử lại sau",
                    });
                  })
                }}
              >
                <Input
                  placeholder="example@gmail.com"
                  value={contactEmail}
                  onChange={(event) => {
                    event.preventDefault();
                    setContactEmail(event.target.value);
                  }}
                />
                <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
              </form>
            </div>
            <img src="/images/contact.png" alt="" className="profile-contact-image" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
