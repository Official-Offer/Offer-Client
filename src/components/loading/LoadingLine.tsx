import { Skeleton } from "antd";

type LoadingLineProps = {
  loading: boolean,
};

export const LoadingLine: React.FC<LoadingLineProps> = ({ children, loading }) => {
  return (
    loading ? <Skeleton.Input loading active style={{ height: "16px" }}/> : children
  );
}