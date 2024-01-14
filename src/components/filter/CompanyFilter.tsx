import React from "react";
import { Select } from "antd";

const onChange = (value: string) => {
	console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
	console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
	input: string,
	option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const CompanyFilter: React.FC = () => (
	<Select
		showSearch
		placeholder="Tất cả ngành"
		optionFilterProp="children"
		onChange={onChange}
		onSearch={onSearch}
		filterOption={filterOption}
		size="large"
		options={[
			{
				value: "công nghệ thông tin",
				label: "Công nghệ thông tin",
			},
			{
				value: "kế toán",
				label: "Kế toán",
			},
			{
				value: "marketing",
				label: "Marketing",
			},
		]}
	/>
);
