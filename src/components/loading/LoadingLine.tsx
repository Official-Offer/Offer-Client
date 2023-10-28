import { Skeleton } from "antd";

type LoadingLineProps = {
  children: any,
  loading?: boolean,
};

export const LoadingLine: React.FC<LoadingLineProps> = ({ children, loading }) => {
  return (
    loading ? <Skeleton.Input active style={{ height: "16px" }}/> : children
  );
}