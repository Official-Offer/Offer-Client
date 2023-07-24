import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card as AntdCard } from "antd";
import { NotiBox } from "@components/box";

const notiList = [
  { read: false },
  { read: true },
  { read: false },
  { read: true },
  { read: true },
  { read: false },
  { read: false },
  { read: true },
  { read: false },
  { read: false }
]

const StudentNotifications: NextPage = () => {
  return (
    <div className="list-layout">
        <AntdCard
          className="list-card"
          title={<h1>Thông Báo</h1>}
          style={{ width: "100%", height: "100%" }}
          bodyStyle={{ height: "100%", overflowY: "scroll" }}
          children={
            notiList.map((noti) => (
              <NotiBox 
                large hasDot 
                read={noti.read} 
                content={
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </span>
                }
              />
            ))
          }
        />
    </div>
  );
};

export default StudentNotifications;