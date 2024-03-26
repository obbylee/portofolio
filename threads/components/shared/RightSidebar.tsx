import { currentUser } from "@clerk/nextjs";

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
      </div>

      <div className="mt-7 flex w-[350px] flex-col gap-9">
        <p className="!text-base-regular text-light-3">No communities yet</p>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          <p className="!text-base-regular text-light-3">No users yet</p>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
