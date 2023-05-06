import React from "react";
import { Input } from "antd";

const Search = Input.Search;

export const SearchBar = ({ placeholder, onSearch, ...props }) => (
  <div {...props}>
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      className="search-bar"
    />
  </div>
);
