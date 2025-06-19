"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: any = await axios.get("/api/users/profile");
        console.log(response);
        router.push(`/profile/${response.data.userId}`);
        console.log(response.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div>
      <div>
        <Toaster />
      </div>
      Profile
    </div>
  );
}
