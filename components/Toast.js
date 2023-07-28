import React from "react";
import { useContext } from "react";
import { ShowToastContext } from "@/Context/ShowToastContext";
import { useEffect } from "react";

function Toast({ msg }) {
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  useEffect(() => {
    setInterval(() => {
      setShowToastMsg(null);
    }, 2000);
  }, [showToastMsg]);
  return (
    <div>
      <div className="toast toast-top toast-end">
        <div className="alert alert-success">
          <span>{msg}</span>
        </div>
      </div>
    </div>
  );
}

export default Toast;
