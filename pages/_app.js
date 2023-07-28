import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import SidebarNav from "@/components/SidebarNav";
import Toast from "@/components/Toast";
import { ShowToastContext } from "@/Context/ShowToastContext";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showToastMsg, setShowToastMsg] = useState();

  return (
    //Using this context it will make sure that the script is applied to all the child and subchild components
    <ShowToastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
      <SessionProvider session={session}>
        <div className="flex">
          <SidebarNav />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-2 bg-blue-50">
              <Component {...pageProps} />
            </div>
            <div className="p-5 bg-white">Storage</div>
          </div>
        </div>
        {showToastMsg ? <Toast msg={showToastMsg} /> : null}
      </SessionProvider>
    </ShowToastContext.Provider>
  );
}
