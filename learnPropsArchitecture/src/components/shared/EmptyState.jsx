import React from "react";

function EmptyState({ message }) {
  if (!message) return null;

  return (
    <p className="mt-1 text-sm text-gray-400 font-medium tracking-wide">
      {message}
    </p>
  );
}

export default EmptyState