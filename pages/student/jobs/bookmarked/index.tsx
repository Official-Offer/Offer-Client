import { NextPage } from "next";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { getBookmarkedList, unbookmarkJob } from "services/apiJob";
import { Card as AntdCard, Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { StyledBookmarkedCard } from "@styles/styled-components/styledBox";
import { StyledMenuButton } from "@styles/styled-components/styledButton";

const BookmarkedJobs: NextPage = () => {
  // States
  const [bookmarkedList, setBookmarkedList] = useState<Record<string, unknown>[]>();

  // Hooks
  const queryClient = useQueryClient();

  const bookmarkedListQuery = useQuery({
    queryKey: "bookmarkedJobs",
    queryFn: getBookmarkedList,
    onSuccess: (res) => setBookmarkedList(res),
    onError: (err) => console.log(`Not able to load bookmarkedJobs: ${err}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const unbookmarkJobMutation = useMutation({
    mutationFn: unbookmarkJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarkedJobs"] }),
    onError: (err) => console.log(`Delete Error: ${err}`),
  });

  // Functions
  const handleUnbookmark = (event) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    Modal.confirm({
      centered: true,
      title: "Xóa việc đã lưu",
      content: "Bạn có chắc chắn muốn xóa việc đã lưu này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk() {
        unbookmarkJobMutation.mutate(id);
      }
    });
  };

  // Components
  const BookmarkedCard = ({ bookmark }): React.FC => (
    <StyledBookmarkedCard>
      <div className="bookmarked-img">
      </div>
      <div className="bookmarked-body">
        <div className="bookmarked-body-title">
          <h2>{bookmark.job_info.title}</h2>
        </div>
        <div className="bookmarked-body-main">
          <p>{bookmark.job_info.company_data.name}</p>
          <p>{bookmark.job_info.location}</p>
        </div>
      </div>
      <div className="bookmarked-dates">
        <div className="date-posted">
          Đăng vào {moment(bookmark.job_info.time_published).format("D/M/YYYY")}
        </div>
        <div className="date-saved">
          Lưu vào {moment(bookmark.timestamp).format("D/M/YYYY")}
        </div>
      </div>
      <div className="bookmarked-close-button" id={bookmark.job_id} onClick={handleUnbookmark}>
        <CloseOutlined />
      </div>
    </StyledBookmarkedCard>
  );

  return (
    <div className="split-layout">
      <section className="split-layout-sticky">
        <AntdCard>
          <StyledMenuButton>
            <h3>Việc đã lưu</h3>
          </StyledMenuButton>
        </AntdCard>
      </section>
      <section className="split-layout-main main-xl">
        <AntdCard
          className="main-panel-card"
          loading={bookmarkedListQuery.isLoading || bookmarkedListQuery.isRefetching || unbookmarkJobMutation.isLoading}
          title={
            <h2>Việc đã lưu</h2>
          }
        >
          {
            bookmarkedList?.length === 0 ? "Chưa có công việc nào đã được lưu" :
            bookmarkedList?.map((job) => (
              <BookmarkedCard bookmark={job} />
            ))
          }
        </AntdCard>
      </section>
      <section className="split-layout-sticky">{/* Empty to center the main section */}</section>
    </div>
  );
};

export default BookmarkedJobs;
