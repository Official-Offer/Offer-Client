import { NextPage } from "next";
import { Card, CardsGrid } from "@components";

const DHBK = {
  name: "Đại Học Bách Khoa Hà Nội",
  cover: "https://cafefcdn.com/203337114487263232/2022/9/9/photo-1-1662692607178636727514.jpg",
  logo: "https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png",
};

//create a next page for the student home page, code below
const StudentHome: NextPage = () => {
  const { Meta } = Card;
  return (
    <main className="main-home">
      <div className="main__content">
        <section>
          <Card
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
        </section>
        <section>
          <h2>Câu Lạc Bộ</h2>
        </section>
        <section>
          <h2>Sự Kiện</h2>
        </section>
        <section>
          <h2>Học Bổng</h2>
        </section>
      </div>
    </main>
  );
};

export default StudentHome;