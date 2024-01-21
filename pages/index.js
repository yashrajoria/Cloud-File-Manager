import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";
import { collection, getFirestore } from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import { query, where, getDocs } from "firebase/firestore";
import { ParentFolderIdContext } from "@/Context/ParentFolderIdContext";
import { ShowToastContext } from "@/Context/ShowToastContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const db = getFirestore(app);
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getUserFolderList();
      getUserFileList();
      // console.log("Session", session.user);
    }
    setParentFolderId(0);
  }, [session, showToastMsg]);

  const getUserFolderList = async () => {
    setFolderList([]); //assigning them empty so that values dont get appended wheneber the page is refreshed
    const getQuery = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user.email),
      where("parentFolderId", "==", 0)
    );
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
      where("parentFolderId", "==", 0)
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
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
