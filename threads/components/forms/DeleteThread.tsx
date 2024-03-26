"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";

type DeleteThreadProps = {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
};

const DeleteThread = ({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: DeleteThreadProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
    if (confirm("Delete thread, are you sure?")) {
      await deleteThread(JSON.parse(threadId), pathname);
      if (!parentId || !isComment) {
        router.push("/");
      }
    }
  };

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Image
      src={"/assets/delete.svg"}
      alt="delete"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleDelete}
    />
  );
};

export default DeleteThread;
