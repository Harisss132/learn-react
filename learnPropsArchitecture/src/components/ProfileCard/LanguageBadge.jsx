import React from "react";

function LanguageBadge({ list = []}) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {list.map((lang) => (
        <span key={lang} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-700 text-blue-300 border border-gray-600">
          {lang}
        </span>
      ))}
    </div>
  );
}

export default LanguageBadge;
