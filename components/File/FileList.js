import React, { useContext } from "react";
import FileItem from "./FileItem";
import { deleteDoc, getFirestore, doc } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { ShowToastContext } from "@/Context/ShowToastContext";

function FileList({ fileList }) {
  const db = getFirestore(app);
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const deleteFile = async (file) => {
    // console.log(file);
    if (!file || !file.id) {
      console.error("Invalid file object or missing 'id' property.");
      return;
    }

    await deleteDoc(doc(db, "files", file.id.toString())).then((resp) => {
      setShowToastMsg("File deleted successfully");
    });
  };
  return (
    <div
      className="bg-white mt-5 p-5
    rounded-lg"
    >
      <h2 className="text-[18px] font-bold">Recent Files</h2>
      <div
        className="grid grid-cols-1
        md:grid-cols-2 
        text-[13px] 
        font-semibold
        border-b-[1px]
        pb-2 mt-3
        border-gray-300
         text-gray-400"
      >
        <h2>Name</h2>
        <div className="grid grid-cols-3">
          <h2>Modified</h2>
          <h2>Size</h2>
          <h2></h2>
        </div>
      </div>
      {fileList &&
        fileList.map((item, index) => (
          <div key={index} onClick={() => deleteFile(item)}>
            <FileItem file={item} key={index} />
          </div>
        ))}
    </div>
  );
}

export default FileList;
