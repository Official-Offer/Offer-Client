import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TogglableButton } from "@styles/styled-components/styledButton";
import { translateJobType } from "@utils/formatters/translateFormat";
import type { Job } from "@types/dataTypes";

type JobFilterNavbarProps = {
  displayHook: {
    displayedJobs: Job[],
    setJobs: (jobs: Job[]) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void,
    filters: Record<string, boolean>,
    setFilters: (filters: Record<string, boolean>) => void,
    sort: string,
    setSort: (sort: string) => void,
  }
}

export const JobFilterNavbar: React.FC<JobFilterNavbarProps> = ({ displayHook }) => {
  const { setSearchTerm, filters, setFilters, sort, setSort } = displayHook;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleFilter = (filterArr: string[], filterType: number) => { // default | 0: job_type, 1: work_type, 2: location
    setFilters((filter) => {
      let filterDict = filter.jobTypes;

      if (filterType === 1) filterDict = filter.workTypes;
      if (filterType === 2) filterDict = filter.locations;

      Object.keys(filterDict).forEach((key) => filterDict[key] = filterArr.includes(key));
      return { ...filter };
    });
  }
  
  return (
    <div className="job-portal-navbar navbar">
      <Input.Search
        className="circular-antd-search"
        allowClear
        enterButton
        placeholder="Tìm kiếm công việc"
        onChange={handleSearchChange}
        onSearch={(value) => setSearchTerm(value)}
      />
      <Space wrap align="stretch">
        <Select
          mode="multiple"
          showArrow
          placeholder="Địa điểm"
          className="round"
          onChange={(value) => handleFilter(value, 2)}
          options={Object.keys(filters.locations).map((location) => ({ value: location, label: location }))}
        />
        <Select
          mode="multiple"
          showArrow
          placeholder="Hình thức làm việc"
          className="round"
          onChange={(value) => handleFilter(value, 0)}
          options={Object.keys(filters.jobTypes).map((jobType) => ({ value: jobType, label: translateJobType(jobType) }))}
        />
        <Select
          mode="multiple"
          showArrow
          placeholder="Mô hình làm việc"
          className="round"
          onChange={(value) => handleFilter(value, 1)}
          options={Object.keys(filters.workTypes).map((workType) => ({ value: workType, label: translateJobType(workType) }))}
        />
      </Space>
    </div>
  );
};
