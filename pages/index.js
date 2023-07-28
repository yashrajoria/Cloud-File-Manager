import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      console.log("Session", session.user);
    }
  }, [session]);
  return <button className="btn">Home</button>;
}
