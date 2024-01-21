import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ParentFolderIdContext } from "@/Context/ParentFolderIdContext";
import { getFirestore } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { useSession } from "next-auth/react";
import { query, where, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import { ShowToastContext } from "@/Context/ShowToastContext";
import FileList from "@/components/File/FileList";
function FolderDetails() {
  const router = useRouter();
  const { name, id } = router.query;
  const { data: session } = useSession();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const db = getFirestore(app);

  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  useEffect(() => {
    setParentFolderId(id);
    if (session) {
      getUserFolderList();
      getUserFileList();
    }
  }, [id, session, showToastMsg]);

  //!TODO: Change name for the given below function to the appropriate one, also write explaination for contexts. Change the styling for the subfolder list
  const getUserFolderList = async () => {
    setFolderList([]); //assigning them empty so that values dont get appended wheneber the page is refreshed
    const getQuery = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );
    // console.log("inner folder success");
    const querySnapshot = await getDocs(getQuery);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };
  const getUserFileList = async () => {
    setFileList([]); //assigning them empty so that values dont get appended wheneber the page is refreshed
    const getQuery = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );
    const querySnapshot = await getDocs(getQuery);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " FileLisy=> ", doc.data());
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };
  return (
    <div className="p-5">
      <SearchBar />
      <h2 className="text-[20px] font-bold mt-5">{name}</h2>

      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}

export default FolderDetails;
