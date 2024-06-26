"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@src/components/Profile";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // redirect to home page if session not exist
  if (!session?.user.id) {
    return <div>404 page not found</div>
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
