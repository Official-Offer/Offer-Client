import { NextPage } from "next";
import { Card as AntdCard, Button } from "antd";
import { Card, CardsGrid, InfoCardTray } from "@components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

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
    commonSchool: ["Bao Dzai", "Tom Ngo", "Kien To"],
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: ["Thuan Dzai"],
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    name: "Thực tập sinh Kỹ sư Phần Mềm",
    institution: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    datePosted: new Date('2023-2-27'),
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
    datePosted: new Date('2023-2-27'),
    cover: "",
  },
];

const clubList = [
  {
    name: "Marketing Member",
    institution: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    datePosted: new Date('2023-2-27'),
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
    datePosted: new Date('2023-2-27'),
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

//create a next page for the student home page, code below
const StudentHome: NextPage = () => {
  const { Meta } = AntdCard;
  const scrollLeft = () => {};
  const scrollRight = () => {};
  return (
    <main className="main-home">
      <div className="main__content">
        <section>
          <AntdCard
            className="uni-cover"
            cover={<img alt={DHBK.name} src={DHBK.cover}/>}
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
          <h2>Đề Xuất Công Việc</h2>
          <InfoCardTray infoList={jobList} isEvent={false}/>
          <div className="see-more">
            <a href="student/jobs">Xem thêm công việc</a>
          </div>
        </section>
        <section>
          <h2>Câu Lạc Bộ</h2>
          <InfoCardTray infoList={clubList} isEvent={false}/>
          <div className="see-more">
            <a href="student/clubs">Xem thêm câu lạc bộ</a>
          </div>
        </section>
        <section>
          <h2>Sự Kiện</h2>
          <InfoCardTray infoList={eventList} isEvent={true}/>
          <div className="see-more">
            <a href="student/events">Xem thêm sự kiện</a>
          </div>
        </section>
        <section>
          <h2>Học Bổng</h2>
          <InfoCardTray infoList={scholarshipList} isEvent={false}/>
          <div className="see-more">
            <a href="student/scholarships">Xem thêm học bổng</a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudentHome;