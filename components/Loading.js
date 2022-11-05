import React from "react";

export default function Loading() {
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-4 h-4 bg-gray-500 rounded-full" />
                <div className="w-4 h-4 bg-gray-500 rounded-full" />
                <div className="w-4 h-4 bg-gray-500 rounded-full" />
            </div>
        </div>

    </div>
  );
}
