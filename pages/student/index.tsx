import { NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { Card as AntdCard, Button, Grid, Input } from "antd";
import { EventCard, InfoCard } from "@components/card";
import { getStudentDetails } from "services/apiStudent";
import { getJobs } from "@services/apiJob";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@services/apiUser";
import { useSession } from "next-auth/react";

const DHBK = {
  name: "Đại Học Bách Khoa Hà Nội",
  cover: "https://cafefcdn.com/203337114487263232/2022/9/9/photo-1-1662692607178636727514.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
};

const jobList = [
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [
      {name: "Bao Dzai", avatar: "/images/avatar.png"}, 
      {name: "Tom Ngo", avatar: "/images/avatar.png"}, 
      {name: "Kien To", avatar: "/images/avatar.png"}
    ],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [{name: "Thuan Dzai", avatar: "/images/avatar.png"}],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const eventList = [
  {
    name: "HackHer",
    institution: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "",
    commonSchool: [],
    date: new Date('2023-2-27'),
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
    date: new Date('2023-2-27'),
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
    date: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

//create a next page for the student home page, code below
const Home: NextPage = () => {
  // Fetching jobs list
  const jobQuery = useQuery({
    queryKey: ["jobs list"],
    queryFn: getJobs,
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });
  const { data: session, status } = useSession();
  console.log(session);
  
  return (
    <main className="main">
      <div className="main__content">
        <section>
          <AntdCard
            className="uni-cover"
            cover={<img src={DHBK.cover} alt={DHBK.name}/>}
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
            <h2 className="header">Tìm công việc mơ ước của bạn</h2>
            <Input.Search
              className="fancy-antd-search"
              allowClear
              placeholder="Tìm công việc"
              enterButton
              size="large"
            />
        </section>
        <section>
          <div className="basic-grid">
            {
              jobQuery.data ? (
                jobQuery.data.map((jobData) => <InfoCard info={jobData} />)
              ) : new Array(4).fill(<InfoCard loading />)
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;