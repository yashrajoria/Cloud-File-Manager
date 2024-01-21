import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import StorageInfo from "./StorageInfo";
import StorageDetailList from "./StorageDetailList";
import StorageUpgradeMsg from "./StorageUpgradeMsg";
import { useSession } from "next-auth/react";

import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/Config/FirebaseConfig";
import Router, { useRouter } from "next/router";
import { getStorageByType } from "@/Services/StorageSize";
function Storage() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [storageList, setstorageList] = useState([]);
  const router = useRouter();
  //To display the storage list under userinfo
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getUserstorageList();
    }
  }, [session]);

  const getUserstorageList = async () => {
    setstorageList([]); // Assigning them empty so that values don't get appended whenever the page is refreshed
    const getQuery = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(getQuery);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " storageList => ", doc.data());
      // console.log(doc.id, "sizes", doc.data().size);
      setstorageList((storageList) => [...storageList, doc.data()]);
    });
  };

  return (
    session && (
      <div>
        <UserInfo />
        <StorageInfo />
        <StorageDetailList storageList={storageList} />
        <StorageUpgradeMsg />
      </div>
    )
  );
}

export default Storage;
