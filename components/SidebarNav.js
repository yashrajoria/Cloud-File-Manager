import Image from "next/image";
import React, { useState } from "react";
import menu from "../data/menu";
import CreateFolder from "./Folder/CreateFolder";
import UploadFile from "./File/UploadFile";
import { useSession } from "next-auth/react";
function SidebarNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: session } = useSession();
  // const onMenuClick=(item,index)=>{
  //     setActiveIndex(index);
  //     router.push('/')
  // }
  return (
    session && (
      <div className="w-[200px] bg-white h-screen sticky top-0 z-10 shadow-blue-200 shadow-md p-5 ">
        <div className="flex justify-center">
          <Image alt="logo" src="/R.jpeg" width={120} height={90} />
        </div>
        <button
          onClick={() => window.upload_file.showModal()}
          className="flex gap-2 items-center bg-blue-500 p-2 w-full justify-center text-white rounded-md px-3 hover:scale-105 transition-all mt-5 text-[13px]"
        >
          Add New File
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          className={
            "flex gap-2 items-center bg-sky-400 w-full  p-2 justify-center text-white rounded-md px-3 hover:scale-105 transition-all mt-1 text-[13px]"
          }
          onClick={() => window.my_modal_3.showModal()}
        >
          New Folder
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <div>
          {menu.list.map((item, index) => (
            <h2
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`flex gap-2 items-center p-2 text-black mt-3 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer ${
                activeIndex === index ? "bg-blue-400 text-white" : null
              }}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.logo}
                />
              </svg>
              {item.name}
            </h2>
          ))}
        </div>
        <dialog id="my_modal_3" className="modal">
          <CreateFolder />
        </dialog>

        <dialog id="upload_file" className="modal">
          <UploadFile closeModal={() => window.upload_file.close()} />
        </dialog>
      </div>
    )
  );
}

export default SidebarNav;
