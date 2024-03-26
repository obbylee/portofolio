"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // create case insensitive for regular expression
    const regex = new RegExp(searchString, "i");

    // query
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, //exclude current user
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // sort options
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // count total user that match the search criteria
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // check if there are more users beyond current page
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    throw new Error("Unable to find users");
  }
}

interface UserProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: UserProps): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    if (path == "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "_id id name image",
        },
        {
          path: "children",
          model: Thread,
          populate: { path: "author", model: User, select: "id name image" },
        },
      ],
    });

    return threads;
  } catch (error) {
    throw new Error("Unable to fetch user posts");
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // find all threads craeted by user
    const userThreads = await Thread.find({ author: userId });

    // collect all thechild thread ids and replies from the children field each user thread
    const childThreads = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // find and return the child thread replies exclude the one created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreads },
      author: { $ne: userId }, // exclude thread by the same user
    }).populate({
      path: "author",
      model: User,
      select: "_id name image",
    });

    return replies;
  } catch (error) {
    throw new Error("Error while fetching activity");
  }
}
