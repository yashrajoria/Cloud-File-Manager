import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
function FolderList({ folderList }) {
  //!TODO: Implement delte folder funcitonality
  const [activeFolder, setActiveFolder] = useState();
  const router = useRouter();
  const onFolderClick = (index, item) => {
    setActiveFolder(index);
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
        id: item.id,
      },
    });
  };
  return (
    <div className="p-5 mt-5 bg-white rounded-lg ">
      <h2 className="text-17px  items-center text-black font-bold">
        Recent Folders
        <span className="float-right text-blue-400 font-normal text-[13px]">
          View All
        </span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4">
        {folderList.map((item, index) => (
          <div
            key={`folder-${index}`}
            onClick={() => onFolderClick(index, item)}
          >
            <FolderItem folder={item} activeFolder={activeFolder === index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderList;
