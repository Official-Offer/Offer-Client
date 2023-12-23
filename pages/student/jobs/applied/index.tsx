import { NextPage } from "next";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  getAppliedJobs,
  getBookmarkedList,
  unbookmarkJob,
} from "@services/apiJob";
import { Card as AntdCard, Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { StyledListCard } from "@styles/styled-components/styledBox";
import { StyledMenuButton } from "@styles/styled-components/styledButton";
import { formatDate } from "@utils/formatters/numberFormat";
import { getCookie } from "cookies-next";
import { FilterSearch } from "@components/search/FilterSearch";

type AppliedCardProps = {
  applied?: {
    created_at?: string;
    job?: {
      id: string;
      pk?: string;
      title: string;
      company: {
        name: string;
        logo: string;
      };
    };
  };
};

const AppliedJobs: NextPage = () => {
  // States
  const [appliedList, setAppliedList] = useState<Record<string, unknown>[]>();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  // original data that remains unchanged
  const [dataset, setDataSet] = useState<Record<string, unknown>[]>([]);
  // Hooks
  const queryClient = useQueryClient();

  const id = getCookie("id");
  const appliedJobListQuery = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: () => getAppliedJobs(Number(id)),
    onSuccess: (res: any) => {
      //   console.log(res);
      setData(res);
      setDataSet(res);
      setSearchResults(res.map((applied: any) => applied.job.title));
    },
    onError: (err: any) =>
      console.log(`Not able to load bookmarkedJobs: ${err}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleFilterSearch = (value: string) => {
    if (!value) {
      setData(dataset);
      return;
    }
    const filteredData = dataset.filter(
      (item: Record<string, unknown>) =>
        (item.job as { title: string })?.title
          ?.toLowerCase()
          .includes(value.toLowerCase()),
    );
    setData(filteredData);
  };

  // Components
  const AppliedCard: React.FC<AppliedCardProps> = ({ applied }) => (
    <StyledListCard hasLink>
      <>
        <Link href={`/student/jobs?id=${applied?.job?.id}`}>
          <div className="link-wrapped">
            <div className="content-img">
              <img
                src={applied?.job?.company?.logo}
                alt="logo"
                className="content-img-image"
              />
            </div>
            <div className="content-body">
              <div className="content-body-title">
                <h2>{applied?.job?.title}</h2>
              </div>
              <div className="content-body-main">
                <p>{applied?.job?.company?.name}</p>
                {/* <p>{job?.job_info?.location}</p> */}
              </div>
            </div>
            <div className="content-dates">
              {/* <div className= "date-saved">
                Đăng vào {formatDate(bookmark?.job_info?.time_published, "D/M/YYYY")}
              </div> */}
              <div className="date-posted">
                Nộp vào {formatDate(applied?.created_at, "D/M/YYYY")}
              </div>
            </div>
          </div>
        </Link>
        <div className="close-btn" id={applied?.job?.id} onClick={() => {}}>
          <CloseOutlined />
        </div>
      </>
    </StyledListCard>
  );

  return (
    <div className="split-layout">
      {/* <section className="split-layout-sticky">
        <AntdCard>
          <StyledMenuButton>
            <h3>Việc đã ứng tuyển</h3>
          </StyledMenuButton>
        </AntdCard>
      </section> */}
      <section className="split-layout-item">
        {/* Create a centered search bar here */}
        <FilterSearch
          placeholder={"Tìm kiếm công việc đã lưu"}
          onSearch={(event: any) => {
            handleFilterSearch(event.target.value);
          }}
          searchResults={searchResults}
        />
        <AntdCard
          className="main-panel-card"
          loading={
            appliedJobListQuery.isLoading || appliedJobListQuery.isRefetching
            // ||
            // unbookmarkJobMutation.isLoading
          }
          title={<h2>Việc đã ứng tuyển</h2>}
        >
          {data?.length === 0
            ? "Bạn chưa nộp công việc nào"
            : data?.map((job) => <AppliedCard applied={job} />)}
        </AntdCard>
      </section>
      <section className="split-layout-sticky">
        {/* Empty to center the main section */}
      </section>
    </div>
  );
};

export default AppliedJobs;
