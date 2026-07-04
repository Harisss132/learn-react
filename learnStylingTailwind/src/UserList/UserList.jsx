import React from "react";
import { useEffect, useState } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0)

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
        return () => {clearInterval(jedaRefresh); }
    }, [refresh]); 

    function handleRefresh() {
        setRefresh(prev => prev + 1);
    }

    if(loading) return (
    <div className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>)
    if(error) return <p className="text-red-500 text-xs italic mt-2">Error: {error}</p>
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {users.map(user => (
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" key={user.id}>
                        <p className="text-xl font-semibold text-gray-800 mb-2">{user.name}</p>
                        <p className="text-sm font-medium text-gray-500 mb-2">{user.email}</p>
                        <p className="text-sm font-medium text-gray-500 mb-2">{user.address.city}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleRefresh} className="mt-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700 transition">Refresh</button>
        </div>
    )
}

export default UserList;