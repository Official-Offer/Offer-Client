import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompanyDataType } from "@components/table/dataType";
import { getCompaniesForAdvisor } from "@services/apiCompany";
import { FilterSearch } from "@components/search/FilterSearch";
import { CompanyFilter } from "@components/filter/CompanyFilter";
import { Avatar, Card } from "antd";
import {
	AntDesignOutlined,
	MailOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import type { Company } from "src/types/dataTypes";
import { Image, Row, Col } from "antd";

const { Meta } = Card;
const Companies: NextPage = () => {
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [data, setData] = useState<Company[]>([]);
	const [dataset, setDataSet] = useState<Company[]>([]);
	const companyQuery = useQuery({
		queryKey: ["companies"],
		queryFn: () => getCompaniesForAdvisor(0),
		onSuccess: (companies: Company[]) => {
			setData(companies);
			setDataSet(companies);
			setSearchResults(companies.map((company) => company.name));
		},
		onError: () => {},
	});

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleFilterSearch = (value: string) => {
		console.log(value);
		if (!value) {
			setData(dataset);
			return;
		}
		const filteredData = dataset.filter(
			(item) => item.name?.toLowerCase().includes(value.toLowerCase())
		);

		setData(filteredData);
	};

	return (
		<div
			style={{
				display: "flex",
				alignContent: "center",
				justifyItems: "center",
				padding: "25px 100px",
			}}
		>
			<div className="recruiter-schools">
				<h2>Công Ty</h2>
				<div
					style={{
						display: "flex",
						gap: "20px",
						margin: "20px 0",
					}}
				>
					<div>
						<FilterSearch
							placeholder={"Tìm công ty"}
							onSearch={(event: any) => {
								handleFilterSearch(event.target.value);
							}}
							searchResults={searchResults}
							size={"large"}
						/>
					</div>
					<CompanyFilter />
				</div>
				<Row
					className="recruiter-schools-grid"
					gutter={[16, 16]}
					justify="start"
				>
					{data.map((company, index) => (
						<Col key={index}>
							<Card
								hoverable
								style={{ width: 300 }}
								cover={
									company.logo ? (
										<img
											src={company.logo}
											style={{
												height: 200,
												objectFit: "contain",
											}}
										/>
									) : (
										<AntDesignOutlined />
									)
								}
							>
								<Meta
									title={company.name}
									description={company.description}
								/>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<MailOutlined
										style={{ marginRight: "8px" }}
									/>
									<p style={{ margin: 0 }}>{company.email}</p>
								</div>
								{company.phone && <p>{company.phone}</p>}
								{company.no_employees && (
									<p>
										{company.no_employees} học sinh đang làm
										ở đây
									</p>
								)}
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Companies;
