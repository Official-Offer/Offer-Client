import React from "react";
import { Input } from "antd";

const Search = Input.Search;

type SearchBarProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  ...props
}) => (
  <div {...props}>
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      className="search-bar"
    />
  </div>
);
