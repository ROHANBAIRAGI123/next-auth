"use client";

import React, { use } from "react";
import { Toaster } from "react-hot-toast";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div>
      <div>
        <Toaster />
      </div>
      Profile
      <span> params.id: {id}</span>
    </div>
  );
}
