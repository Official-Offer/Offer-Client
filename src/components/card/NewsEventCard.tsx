import { NewsEvent } from "src/types/dataTypes";
interface NewsEventCardProps {
  newsEvent?: NewsEvent;
  loading?: boolean;
}

export const NewsEventCard: React.FC<NewsEventCardProps> = ({
    newsEvent,
    loading,
    ...rest
}) => {
    return <div>Sự kiện</div>
}