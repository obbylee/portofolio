"use server";

import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchCommunityPosts(id: string) {
  try {
    connectToDB();

    const communityPosts = await Community.findById(id).populate({
      path: "threads",
      model: Thread,
      populate: [
        { path: "author", model: User, select: "id name image" },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "_id image",
          },
        },
      ],
    });

    return communityPosts;
  } catch (error) {
    throw new Error("Unable to fetch community posts");
  }
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
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
    const query: FilterQuery<typeof Community> = {};

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // sort options
    const sortOptions = { createdAt: sortBy };

    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    const totalCommunitiesCount = await Community.countDocuments(query);

    const communities = await communitiesQuery.exec();

    const isNext = totalCommunitiesCount > skipAmount + communities.length;
    console.log(communities);
    return { communities, isNext };
  } catch (error) {
    throw new Error("Unable to fetch communities");
  }
}

export async function fetchCommunityDetails(id: string) {
  try {
    connectToDB();

    const communityDetails = await Community.findOne({ id }).populate([
      "createdBy",
      { path: "members", model: User, select: "_id id name username image" },
    ]);
    return communityDetails;
  } catch (error) {
    throw new Error("unable to fetch community details");
  }
}

export async function createCommunity(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) {
  try {
    connectToDB();

    // find user by id
    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found");
    }

    const newCommunity = new Community({
      id,
      name,
      username,
      image,
      bio,
      createdById: user._id,
    });

    const createdCommunity = await newCommunity.save();

    // update user model
    user.communities.push(createdCommunity._id);
    await user.save();

    return createdCommunity;
  } catch (error) {
    throw new Error("unable to create community");
  }
}

export async function addMemberToCommunity(
  communityId: string,
  memberId: string
) {
  try {
    connectToDB();

    // find community
    const community = await Community.findOne({ id: communityId });

    if (!community) {
      throw new Error("Community not found");
    }

    // find user / member
    const user = await User.findOne({ id: memberId });

    if (!user) {
      throw new Error("user not found");
    }

    // check if the user is already community member
    if (community.members.includes(user._id)) {
      throw new Error("User is already a member of the community");
    }

    // add user id to the member
    community.members.push(user._id);
    await community.save();

    // add the community id to the communities array in user
    user.communities.push(community._id);
    await user.save();

    return community;
  } catch (error) {
    throw new Error("unable to add member to community");
  }
}

export async function removeUserFromCommunity(
  userId: string,
  communityId: string
) {
  try {
    connectToDB();

    const userIdObject = await User.findOne({ id: userId }, { _id: 1 });
    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("user not found");
    }

    if (!communityIdObject) {
      throw new Error("community not found");
    }

    // remove user id from the members array in the community
    await Community.updateOne(
      {
        _id: communityIdObject._id,
      },
      { $pull: { members: userIdObject._id } }
    );

    // remove community id from community array in user
    await User.updateOne(
      {
        _id: userIdObject._id,
      },
      { $pull: { members: communityIdObject._id } }
    );

    return { success: true };
  } catch (error) {
    throw new Error("unable to remove user from community");
  }
}

export async function updateCommunityInfo(
  communityId: string,
  name: string,
  username: string,
  image: string
) {
  try {
    connectToDB();

    // find community by id
    const updateCommunity = await Community.findOneAndUpdate(
      { id: communityId },
      { name, username, image }
    );

    if (!updateCommunity) {
      throw new Error("community not found");
    }

    return updateCommunity;
  } catch (error) {
    throw new Error("unable to update community info");
  }
}

export async function deleteCommunity(communityId: string) {
  try {
    connectToDB();

    // find community by id
    const deletedCommunity = await Community.findOneAndDelete({
      id: communityId,
    });

    if (!deleteCommunity) {
      throw new Error("community not found");
    }

    // delete all threads associated with the community
    await Thread.deleteMany({ community: communityId });

    // find all user who are part of the community
    const communityUsers = await User.find({ communities: communityId });

    // remove community from the communities array of each user
    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(communityId);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deleteCommunity;
  } catch (error) {
    throw new Error("unable to delete community");
  }
}
