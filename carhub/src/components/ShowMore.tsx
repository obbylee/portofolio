"use client";

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import { updateSearchParams } from "@/utils";
import { CustomButton } from "@/components";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;

    // update the limit search parameter in the url with new value
    const newPathname = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathname);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
