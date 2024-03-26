"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  path: string;
  pageNumber: number;
  isNext: boolean;
};
const Pagination = ({ path, pageNumber, isNext }: PaginationProps) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  return (
    <div className="pagination">
      <Button
        onClick={() => handleNavigation("prev")}
        className="!text-small-regular text-light-2"
        disabled={!isNext}
      >
        Prev
      </Button>

      <p className="text-small-semibold text-light-1">{pageNumber}</p>

      <Button
        onClick={() => handleNavigation("prev")}
        className="!text-small-regular text-light-2"
        disabled={!isNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
