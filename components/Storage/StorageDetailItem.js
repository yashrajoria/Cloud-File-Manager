import React from "react";
import StorageSize from "../../Services/StorageSize";

function StorageDetailItem({ item }) {
  const sizeValue = (item.size / 1024 ** 2).toFixed(2);

  return (
    <>
      <div className="flex justify-between items-center mt-3 border-b-[1px] pb-2">
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-8 h-8 
          rounded-md
          p-2 ${
            item.type == "Videos"
              ? "bg-blue-200 text-blue-600"
              : item.type == "Documents"
              ? "bg-yellow-200  text-yellow-600"
              : item.type == "Others"
              ? "bg-red-200  text-red-600"
              : "bg-green-200 text-green-600"
          } `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={item.logo} // Fixed this line
            />
          </svg>
          <div>
            {item.type === "jpg" ? (
              <h2 className="text-[12px] font-semibold">Image: {item.name}</h2>
            ) : item.type === "pdf" ? (
              <h2 className="text-[12px] font-semibold">PDF: {item.name}</h2>
            ) : (
              <>
                <h2 className="text-[14px] font-semibold">{item.name}</h2>
                <h2 className="text-[12px] font-semibold">{item.type}</h2>
                <h2 className="text-[12px] mt-[-4px] text-gray-400">
                  {item.totalFile} Files
                </h2>
              </>
            )}
          </div>
        </div>
        <div className="font-semibold">{sizeValue} MB</div>
      </div>
    </>
  );
}

export default StorageDetailItem;
