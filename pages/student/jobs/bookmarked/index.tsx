import { NextPage } from "next";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import { Card as AntdCard, Button } from "antd";

const BookmarkedJobs: NextPage = () => {
  // States
  const [bookmarkedList, setBookmarkedList] = useState<Record<string, unknown>[]>();

  // Queries
  const bookmarkedListQuery = useQuery({
    queryKey: "bookmarkedJobs",
    queryFn: () => ([
      {
        id: 1,
        timestamp: "2021-09-26T12:00:00Z",
        job_id: 1,
        created_by: 1,
      },
      {
        id: 2,
        timestamp: "2021-09-26T12:00:00Z",
        job_id: 2,
        created_by: 1,
      },
      {
        id: 3,
        timestamp: "2021-09-26T12:00:00Z",
        job_id: 3,
        created_by: 1,
      },
    ]),
    onSuccess: (res) => setBookmarkedList(res),
    onError: (err) => console.log(`Not able to load bookmarkedJobs: ${err}`),
  });

  // Components
  const BookmarkedCard = (job: Record<string, unknown>) => (
    <div>
      <h3>{job.id}</h3>
      <p>{job.timestamp}</p>
      <p>{job.job_id}</p>
      <p>{job.created_by}</p>
    </div>
  );

  return (
    <div className="split-layout">
      <section className="split-layout-sticky">
        <AntdCard>
          <Button type="text">
            <h3>Việc đã lưu</h3>
          </Button>
        </AntdCard>
      </section>
      <section className="split-layout-main main-xl">
        <AntdCard
          className="main-panel-card"
          loading
          title={
            <h2>Việc đã lưu</h2>
          }
        >
          {
            bookmarkedList?.map((job) => (
              <BookmarkedCard job={job} />
            ))
          }
        </AntdCard>
      </section>
    </div>
  );
};

export default BookmarkedJobs;
