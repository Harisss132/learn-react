import React from "react";

function StatList({ stats}) {
  return (
  <div className="flex gap-4 text-xs text-gray-400 mb-4 border-t border-b border-gray-700 py-3">
    <div className="flex items-center gap-1">
      <span className="font-bold text-gray-200">{stats.repositories}</span>
      <span>Repositori</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="font-bold text-gray-200">{stats.followers}</span>
      <span>Followers</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="font-bold text-gray-200">{stats.following}</span>
      <span>Following</span>
    </div>
  </div>
  )
}

export default StatList;