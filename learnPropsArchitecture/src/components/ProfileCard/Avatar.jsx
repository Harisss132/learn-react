import React from "react";

function Avatar({ imageUrl, nama, username }) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <img
        src={imageUrl}
        alt={nama}
        className="w-14 h-14 rounded-full border border-gray-600 object-cover"
      />
      <div>
        <h2 className="text-gray-100 font-semibold text-lg hover:text-blue-400 cursor-pointer leading-tight">
          {nama}
        </h2>
        <span className="text-gray-400 text-sm block">{username}</span>
      </div>
    </div>
  );
}

export default Avatar;
