import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter users whenever searchQuery changes
        const filtered = users.filter(user => {
            return (
                user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.password.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
            setFilteredUsers(response.data); // Set initial filtered users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditUser = (userId) => {
        window.location.href = `/edit-user/${userId}`;
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/${userId}`);
                setUsers(users.filter(user => user.userId !== userId));
                setFilteredUsers(filteredUsers.filter(user => user.userId !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user.');
            }
        }
    };

    return (
        <div className="bg-gray-100">
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="space-x-4">
                    <a href="/admin-dashboard" className="text-blue-600 hover:text-gray-900">Home</a>
                </div>
                <div className="space-x-4">
                    <a href="/" className="text-blue-600 hover:text-gray-900">Logout</a>
                </div>
            </nav>
            <div className="container max-w-6xl mt-30 p-6 bg-gray-100 rounded-lg ml-40">
                <div className="text-2xl font-bold text-center mb-6 text-black">User Management</div>
                <div className="text-right mb-6">
                    <Link to="/create-user">
                        <button className="bg-blue-400 text-white rounded px-4 py-2 hover:bg-blue-600">Create User</button>
                    </Link>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-200 text-gray-800 rounded px-4 py-2 ml-2"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Password</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.userId} className="border-b border-gray-200">
                                    <td className="px-6 py-4">{user.userId}</td>
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.password}</td>
                                    <td className="px-6 py-4">
                                        <div className='flex'>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                                onClick={() => handleEditUser(user.userId)}>Edit</button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
                                                onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
