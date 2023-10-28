import { NextPage } from "next";
import { useRouter } from "next/router";
import { nextReplaceUrl } from "next-replace-url";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Popover, Radio, Select, Slider, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getJobs } from "@services/apiJob";
import { InfoCard } from "@components/card/InfoCard";
import { useDisplayJobs } from "@hooks/useDisplayJobs";
import { TogglableButton } from "@styles/styled-components/styledButton";
import { formatAddress } from "@utils/formatters";

const jobFilterArr = [
  {
    name: "Full/Part",
    checked: true,
  },
  {
    name: "Intern",
    checked: false,
  },
  {
    name: "1k+",
    checked: false,
  },
  {
    name: "On-campus",
    checked: false,
  },
];


const StudentJobs: NextPage = () => {
  const { displayedJobs, setJobs, setSearchTerm, filters, sort, setFilters, setSort } = useDisplayJobs();

  const jobQuery = useQuery({
    queryKey: ["jobs list"],
    queryFn: getJobs,
    onSuccess: (jobData) => setJobs(jobData.message),
    onError: (error) => console.log(`Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleFilterLocation = (locationArr: string[]) => {
    setFilters((filter) => {
      const filterLocations = filter.locations;
      Object.keys(filterLocations).forEach((location) => filterLocations[location] = locationArr.includes(location));
      return { ...filter, filterLocations };
    });
  }

  const handleFilterSalary = (value: number[]) => {
    setFilters((filter) => {
      const salary = filter.salary;
      salary.min = value[0];
      salary.max = value[1];
      return { ...filter, salary };
    });
  }

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const removeSort = (value: string) => {
    if (value === sort) {
      setSort("")
    }
  }
  
  return (
    <div className="main">
      <div className="main__content">
        <section className="main-mt">
          <Input.Search
            className="gradient-antd-search"
            allowClear
            placeholder="Tìm công việc"
            enterButton="Tìm kiếm"
            size="large"
            onChange={handleSearch}
            onSearch={(value: string) => setSearchTerm(value)}
          />
          <Space direction="vertical" className="justify-center">
            <Space wrap align="center" className="justify-center">
              <Select
                mode="tags"
                showArrow
                size="large"
                placeholder="Địa điểm"
                className="round-border"
                onChange={handleFilterLocation}
                options={Object.keys(filters.locations).map((location) => ({ value: location, label: location }))}
              />
              {/* <Popover
                content={
                  <Space wrap>
                    {
                      Object.keys(filters.locations).length === 0 ? <span>Không có địa điểm để chọn</span> :
                        Object.keys(filters.locations).map((location) => (
                          <TogglableButton
                            name={location}
                            checked={filters.locations[location]}
                            onClick={handleFilterLocation}
                          >
                            {location}
                          </TogglableButton>
                        ))
                    }
                  </Space>
                }
                trigger="hover"
                placement="bottom"
              >
                <Button 
                  size="large"
                  className="round-border right-icon"
                >
                  <span>
                    Địa điểm
                  </span>
                  <span><DownOutlined/></span>
                </Button>
              </Popover> */}
              <Popover
                content={
                  <div className="layout-medium layout-hstack-stretch-center">
                    <span>{filters.salary[0]}</span>
                    <span>
                      <Slider 
                        range
                        autoAdjustOverflow
                        min={2000}
                        max={4000}
                        step={100}
                        defaultValue={filters.salary}
                        onChange={handleFilterSalary}
                      />
                    </span>
                    <span>{filters.salary[1]}</span>
                  </div>
                }
                minWidth="1000px"
                trigger="hover"
                placement="bottom"
              >
                <Button 
                  size="large"
                  className="round-border right-icon"
                >
                  <span>
                    Mức lương
                  </span>
                  <span><DownOutlined/></span>
                </Button>
              </Popover>
            </Space>
            <Space wrap align="center" className="justify-center">
              <Radio.Group
                defaultValue="related"
                buttonStyle="solid"
                size="large"
              >
                <Space.Compact className="round-border">
                  <Radio.Button value="all">Tất cả</Radio.Button>
                  <Radio.Button value="related">Liên quan</Radio.Button>
                </Space.Compact>
              </Radio.Group>
                <Radio.Group
                  buttonStyle="solid"
                  size="large"
                  value={sort}
                  onChange={handleSort}
                >
                  <Space.Compact className="round-border">
                    <Radio.Button value="date-posted" onClick={() => removeSort("date-posted")}>Ngày đăng</Radio.Button>
                    <Radio.Button value="date-updated" onClick={() => removeSort("date-updated")}>Ngày cập nhật</Radio.Button>
                    <Radio.Button value="salary-desc" onClick={() => removeSort("salary-desc")}>Lương cao đến thấp</Radio.Button>
                    <Radio.Button value="salary-asc" onClick={() => removeSort("salary-asc")}>Lương thấp đến cao</Radio.Button>
                  </Space.Compact>
                </Radio.Group>
            </Space>
          </Space>
        </section>
        <section>
          <div className="layout-grid">
            {
              jobQuery.isLoading ? new Array(4).fill(<InfoCard loading />) : (
                displayedJobs.map((jobData) => <InfoCard info={jobData} />)
              )
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentJobs;