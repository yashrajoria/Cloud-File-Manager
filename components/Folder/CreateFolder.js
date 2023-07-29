import Image from "next/image";
import React, { useContext, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { useSession } from "next-auth/react";
import { ShowToastContext } from "@/Context/ShowToastContext";
import { ParentFolderIdContext } from "@/Context/ParentFolderIdContext";
function CreateFolder() {
  const [folderName, setFolderName] = useState();
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const db = getFirestore(app);
  const { data: session } = useSession();
  const docId = Date.now().toString();
  const timestamp = Date.now().toString();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  //!TODO: Add timestamp and also make sure id is in the correct format
  const onCreate = async () => {
    console.log(folderName);
    await setDoc(doc(db, "Folders", docId), {
      name: folderName,
      id: docId,
      createdBy: session.user.email,
      parentFolderId: parentFolderId,
    });
    setShowToastMsg("Folder created successfully");
  };
  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className="w-full items-center flex flex-col justify-center gap-3">
          <Image src="/folder.png" alt="folder" width={50} height={90} />
          <input
            type="text"
            placeholder="File Name"
            className="p-2 border-[1px] outline-none rounded-md"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreate(folderName)}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFolder;
