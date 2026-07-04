import React from "react";
import { useState, useEffect } from "react";

function FetchListUser() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setErrorUsers(null);
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error(`Error HTPP: ${response.status}`);
        }

        const result = await response.json();
        setUsers(result);
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    const refresh = setInterval(fetchUser, 30000);
    return () => clearInterval(refresh);
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      return;
    }
    async function fetchUserPost() {
      try {
        setErrorUsers('');
        setLoadingDetail(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`,
        );
        if (!response.ok) {
          throw new Error(`Error HTPP: ${response.status}`);
        }
        const result = await response.json();
        setPosts(result);
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoadingDetail(false);
      }
    }

    fetchUserPost();
  }, [selectedUserId]);

  if (loading) return <p>Sedang memuat user...</p>;
  return (
    <div className="container">
      {!selectedUserId && <p>Pilih user untuk melihat posts</p>}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="" disabled>
          Pilih salah satu
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div>
        <h3>Detail User</h3>
        {loadingDetail && <p>Memuat detail...</p>}
        <ul>
          {!loadingDetail &&
            posts.map((post) => (
              <li key={post.id}>
                <p>
                  post ke: <em>{post.id}</em>
                </p>
                <h3>Title: {post.title}</h3>
                <p>Quoute: {post.body}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FetchListUser;
