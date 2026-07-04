import React from "react";
import { useState } from "react";
import data from "../data/developers";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SearchBar from "../components/shared/SearchBar";
import EmptyState from "../components/shared/EmptyState";

function DeveloperDirectoryPage() {
  const users = data;
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDevelopers = users.filter(user => user.nama.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={"Cari developer"}/>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {filteredDevelopers.length > 0 ? (
        filteredDevelopers.map((user) => (
          <ProfileCard key={user.id} user={user}/>
        ))
      ) : (
        <EmptyState message={"Developer tidak ditemukan"}/>
      )}
    </div>
    </div>
  );
}

export default DeveloperDirectoryPage;