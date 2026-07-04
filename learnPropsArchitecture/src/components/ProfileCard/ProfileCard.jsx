import React from "react";
import { useState } from "react";
import LanguageBadge from "./LanguageBadge";
import Bio from "./Bio";
import Avatar from "./Avatar";
import StatList from "./StatList";
import ActionButton from "./ActionButtons";

function ProfileCard({ user }) {
  return (
    <div
      className="bg-gray-800 border-gray-700 rounded-lg p-5 flex flex-col justify-between shadow-md hover:border-gray-500 transition-colors"
    >
      <Avatar
        imageUrl={user.imageUrl}
        nama={user.nama}
        username={user.username}
      />
      <Bio bio={user.bio} />
      <StatList
        stats={user.stats}
      />
      <LanguageBadge list={user.bahasa} />
      <ActionButton />
    </div>
  );
}

export default ProfileCard;
