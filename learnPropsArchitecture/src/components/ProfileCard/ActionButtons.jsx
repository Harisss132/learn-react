import React from "react";

function ActionButton() {
  return (
    <div className="flex gap-2 mt-auto">
      <button
        type="button"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors border border-blue-500"
      >
        Follow
      </button>
      <button
        type="button"
        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors border border-gray-500"
      >
        Message
      </button>
    </div>
  );
}

export default ActionButton;