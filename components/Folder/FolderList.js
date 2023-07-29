import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
function FolderList({ folderList }) {
  //dummy data
  // const folderList = [
  //   {
  //     id: 1,
  //     Name: "Folder 1",
  //   },
  //   {
  //     id: 2,
  //     Name: "Folder 2",
  //   },
  //   {
  //     id: 3,
  //     Name: "Folder 3",
  //   },
  //   {
  //     id: 4,
  //     Name: "Folder 4",
  //   },
  //   {
  //     id: 5,
  //     Name: "Folder 5",
  //   },
  //   {
  //     id: 6,
  //     Name: "Folder 6",
  //   },
  // ];
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
          <div onClick={() => onFolderClick(index, item)}>
            <FolderItem
              key={index}
              folder={item}
              activeFolder={activeFolder == index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderList;
