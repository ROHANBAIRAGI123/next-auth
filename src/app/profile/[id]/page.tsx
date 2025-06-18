"use client";

import React, { use } from "react";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div>
      Profile
      <span> params.id: {id}</span>
    </div>
  );
}
