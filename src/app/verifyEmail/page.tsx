"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");

  const verifyUser = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", {
        token,
      });
      console.log(response.data);
      setVerified(true);
    } catch (error) {
      console.log("error in verifyEmail", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);

  return (
    <div>
      {verified ? <h2>Email verified successfully</h2> : <h2>Verifying...</h2>}
    </div>
  );
}
