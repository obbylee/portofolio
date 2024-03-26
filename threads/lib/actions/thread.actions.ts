"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";

type CreateThreadProps = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThreadProps) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createThread = await Thread.create({
      text,
      author,
      community: communityIdObject,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    if (communityIdObject) {
      // update community
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { threads: createThread._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  // fetch posts that have no parent null/undefined top level thread
  const postQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({ path: "community", model: Community })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postQuery.exec();
  const isNext = totalPostCount > skipAmount + posts.length;
  return { posts, isNext };
}

async function fetchAllChildThreads(id: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: id });

  // nested/recursive fetch
  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

export async function deleteThread(
  id: string,
  pathname: string
): Promise<void> {
  try {
    connectToDB();

    // find the thread
    const mainThread = await Thread.findById(id).populate("author community");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    // fetch all child threads
    const descendantThreads = await fetchAllChildThreads(id);

    // get all thread and it subs thread id
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    // extract author id and community id then update user and community model
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()),
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.community?._id?.toString()),
        mainThread.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // delete recursive
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    // update user model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    // update community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(pathname);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  try {
    connectToDB();

    const thread = await Thread.findById(threadId)
      .populate({ path: "author", model: User, select: "_id id name image" })
      .populate({
        path: "community",
        model: Community,
        select: "_id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "_id id parentId image" },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error) {
    throw new Error("Unable to fetch thread");
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    // find main thread
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // create new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // set the parent id of the main thread
    });

    // save comment thread
    const savedCommentThread = await commentThread.save();

    // add the newly created comment to original thread as children
    originalThread.children.push(savedCommentThread._id);

    // save and update the main thread;
    await originalThread.save();

    // refresh
    revalidatePath(path);
  } catch (error) {
    throw new Error("Unable to add comment");
  }
}
