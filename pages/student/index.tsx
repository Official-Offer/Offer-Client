import { NextPage } from "next";
import { Card as AntdCard, Button } from "antd";
import { Card, CardsGrid } from "@components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const DHBK = {
  name: "Đại Học Bách Khoa Hà Nội",
  cover: "https://cafefcdn.com/203337114487263232/2022/9/9/photo-1-1662692607178636727514.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
};

const jobList = [
  {
    position: "Thực tập sinh Kỹ sư Phần Mềm",
    name: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Thực tập sinh Kỹ sư Phần Mềm",
    name: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Thực tập sinh Kỹ sư Phần Mềm",
    name: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Thực tập sinh Kỹ sư Phần Mềm",
    name: "Samsung",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const clubList = [
  {
    position: "Marketing Member",
    name: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Marketing Member",
    name: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Marketing Member",
    name: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    position: "Marketing Member",
    name: "CLB Doi Ngoai DHNT ",
    location: "TP. Hồ Chí Minh",
    attribute: "Full-Time/Part-Time/Remote",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
];

const scholarshipList = [
  {
    title: "Chancellor's Award",
    school: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    title: "Chancellor's Award",
    school: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    title: "Chancellor's Award",
    school: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
    cover: "https://p1-tt.byteimg.com/origin/pgc-image/ab3ad6504eab497aaef03096a3863991?from=pc",
  },
  {
    title: "Chancellor's Award",
    school: "University of Massachusetts at Amherst",
    location: "Amherst",
    attribute: "$16,000",
    commonSchool: [],
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
              <div className="horizontal">
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
          <div className="card-tray">
            <Button className="scroll-btn" icon={<ArrowLeftOutlined />} onClick={scrollLeft}/>
            {jobList.map((job) => {
              return (
                <Card 
                  className="tray-item"
                  cover={<img alt={job.position + " at " + job.name} src={job.cover}/>}
                  children={<Meta
                      title={job.position}
                      description={
                        <div className="vertical">
                          <h4>{job.name}</h4>
                          <span>{job.location}</span>
                          <p>{job.attribute}</p>
                        </div>
                      }
                  />}
                />);
              })}
            <Button className="scroll-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
          </div>
          <div className="see-more">
            <a href="student/jobs">Xem thêm công việc</a>
          </div>
        </section>
        <section>
          <h2>Câu Lạc Bộ</h2>
          <div className="card-tray">
            <Button className="scroll-btn" icon={<ArrowLeftOutlined />} onClick={scrollLeft}/>
            {clubList.map((club) => {
              return (
                <Card 
                  className="tray-item"
                  cover={<img alt={club.position + " at " + club.company} src={club.cover}/>}
                  children={<Meta
                      title={club.position}
                      description={
                        <div className="vertical">
                          <h4>{club.company}</h4>
                          <span>{club.location}</span>
                          <p>{club.attribute}</p>
                        </div>
                      }
                  />}
                />);
              })}
            <Button className="scroll-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
          </div>
          <div className="see-more">
            <a href="student/jobs">Xem thêm câu lạc bộ</a>
          </div>
        </section>
        <section>
          <h2>Sự Kiện</h2>
        </section>
        <section>
          <h2>Học Bổng</h2>
          <div className="card-tray">
            <Button className="scroll-btn" icon={<ArrowLeftOutlined />} onClick={scrollLeft}/>
            {scholarshipList.map((award) => {
              return (
                <Card 
                  className="tray-item"
                  cover={<img alt={award.title + " at " + award.school} src={award.cover}/>}
                  children={<Meta
                      title={award.title}
                      description={
                        <div className="vertical">
                          <h4>{award.school}</h4>
                          <span>{award.location}</span>
                          <p>{award.attribute}</p>
                        </div>
                      }
                  />}
                />);
              })}
            <Button className="scroll-btn" icon={<ArrowRightOutlined />} onClick={scrollRight}/>
          </div>
          <div className="see-more">
            <a href="student/jobs">Xem thêm học bổng</a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudentHome;