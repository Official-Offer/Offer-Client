import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { checkIsBookmarked, bookmarkJob, unbookmarkJob } from "@services/apiJob";
import { BookmarkOutlined, BookmarkFilled } from "@components/icons";

type BookmarkButtonProps = {
  id: number,
  isClickedByOther?: boolean,
  setIsClickedByOther?: (isBookmarked: boolean) => void,
  setClickOther?: (isBookmarked: boolean) => void,
};

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ id, isClickedByOther, setIsClickedByOther, setClickOther, ...rest }) => {
  // States
  const [bookmarkClicked, setBookmarkClicked] = useState<boolean>(false); // Prevent mutating during first initial load
  const [isInitBookmarked, setIsInitBookmarked] = useState<boolean>(false); // Avoid unnecessary API calls if users double click
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Queries
  const bookmarkQuery = useQuery({
    queryKey: ["bookmark", id],
    queryFn: () => checkIsBookmarked(id),
    onSuccess: (data) => {
      setIsInitBookmarked(data.status);
      setIsBookmarked(data.status);
    },
    onError: (error) => console.log(`Bookmark Error: ${error}`),
    refetchOnWindowFocus: false,
  });

  const bookmarkMutation = useMutation({
    mutationFn: (id) => isBookmarked ? bookmarkJob(id) : unbookmarkJob(id),
    onSuccess: () => bookmarkQuery.refetch(),
    onError: (err) => console.log(`Bookmark Error: ${err}`),
  });

  // Hooks
  // Start timer when bookmark button is clicked, reset if clicked again in under 2 seconds
  useEffect(() => {
    if (!bookmarkClicked) return;
    // Prevent lags from user spam clicking the bookmark button by delaying API call by 2 seconds
    let resetTimer;
    resetTimer = setTimeout(() => {
      if (isInitBookmarked === isBookmarked) return;
      bookmarkMutation.mutate(id);
      setBookmarkClicked(false);
      setIsInitBookmarked(isBookmarked);
    }, 2000);
    return () => clearTimeout(resetTimer);
  }, [isBookmarked]);

  useEffect(() => {
    if (!isClickedByOther) return;
    setIsBookmarked(!isBookmarked);
    setIsClickedByOther(false);
  }, [isClickedByOther]);

  // Functions
  const handleClick = (event) => {
    event.stopPropagation();
    setBookmarkClicked(true);
    setIsBookmarked(!isBookmarked);
    if (setClickOther) setClickOther(true);
  };

  return (
    <button {...rest} type="button" disabled={bookmarkQuery.isLoading} onClick={handleClick}>
      {
        isBookmarked ? <BookmarkFilled /> : <BookmarkOutlined />
      }
    </button>
  )
}