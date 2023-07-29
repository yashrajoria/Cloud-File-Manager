import { app } from "@/Config/FirebaseConfig";
import { getDocs, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { query, collection, querySnapshot, where } from "firebase/firestore";
function StorageInfo() {
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  let totalSize = 0;
  useEffect(() => {
    if (session) {
      totalSize = 0;
      getAllFiles();
    }
  });
  const getAllFiles = async () => {
    const getFiles = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(getFiles);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data()["size"]);
      totalSize = totalSize + doc.data()["size"];
    });
    console.log((totalSize / 1024 ** 2).toFixed(2) + " MB");
    setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + " MB");
  };

  return (
    <div className="mt-7">
      <h2
        className="text-[22px] 
           font-bold"
      >
        {totalSizeUsed}{" "}
        <span
          className="text-[14px]
            font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div
        className="w-full
            bg-gray-200  h-2.5 flex"
      >
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[35%]"></div>
        <div className="bg-yellow-400 h-2.5 w-[15%]"></div>
      </div>
    </div>
  );
}

export default StorageInfo;
