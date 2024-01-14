import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

interface ISearch {
	placeholder: string;
	onSearch: (event: any) => void;
	searchResults: string[];
	size?: SizeType;
	// options: any;
}

export const FilterSearch: React.FC<ISearch> = ({
	placeholder,
	onSearch,
	// searchResults,
	size,
}: ISearch) => {
	return (
		<Input.Search
			style={{ width: 500 }}
			prefix={<SearchOutlined />}
			enterButton
			size={size}
			// showSearch
			placeholder={placeholder}
			// optionFilterProp="children"
			onChange={onSearch}
			allowClear
			// filterOption={(input: string, option: { label: any; }) =>
			//   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			// }
			// options={
			//   searchResults
			//     ? searchResults.map((n) => ({
			//         value: n,
			//         label: n,
			//       }))
			//     : [
			//         {
			//           value: "Kiên Tô",
			//           label: "Kiên Tô",
			//         },
			//         {
			//           value: "Võ Thuấn",
			//           label: "Võ Thuấn",
			//         },
			//         {
			//           value: "Bảo Đặng",
			//           label: "Bảo Đặng",
			//         },
			//       ]
			// }
		/>
	);
};
