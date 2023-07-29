import { useRouter } from "next/router";
import React from "react";

function FolderDetails() {
  const router = useRouter();
  const { name, id } = router.query;
  return <div>FolderDetails:{name}</div>;
}

export default FolderDetails;
