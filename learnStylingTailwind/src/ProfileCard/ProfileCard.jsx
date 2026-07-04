import React from "react";
import { useState } from "react";
import data from "./data";

function ProfileCard() {
  const [users, setUsers] = useState(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-900 min-h-screen">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-gray-800 border-gray-700 rounded-lg p-5 flex flex-col justify-between shadow-md hover:border-gray-500 transition-colors"
        >
          <div className="flex items-center gap-4 mb-3">
            <img
              src={user.imageUrl}
              alt={user.nama}
              className="w-14 h-14 rounded-full border border-gray-600 object-cover"
            />
            <div>
              <h2 className="text-gray-100 font-semibold text-lg hover:text-blue-400 cursor-pointer leading-tight">{user.nama}</h2>
              <span className="text-gray-400 text-sm block">{user.username}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.bio}</p>
          <div className="flex gap-4 text-xs text-gray-400 mb-4 border-t border-b border-gray-700 py-3">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-200">{user.stats.repositories}</span>
              <span>Repositori</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-200">{user.stats.followers}</span>
              <span>Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-200">{user.stats.following}</span>
              <span>Following</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {user.bahasa.map((lang, index) => (
              <span key={index} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-700 text-blue-300 border border-gray-600">{lang} </span>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <button type="button" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors border border-blue-500">Follow</button>
            <button type="button" className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors border border-gray-500">Message</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileCard;
