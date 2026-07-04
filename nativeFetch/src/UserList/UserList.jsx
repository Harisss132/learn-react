import React from "react";
import { useEffect, useState } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
               setLoading(true);
               const response = await fetch('https://jsonplaceholder.typicode.com/users');
               
               if(!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
               }

               const result = await response.json();
               setUsers(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData()
        const jedaRefresh = setInterval(fetchData, 30000);
        return() => {clearInterval(jedaRefresh); }
    }, []);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    return (
        <div className="container">
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>Id: {user.id}</p>
                        <p>Nama: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Kota: {user.address.city}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;