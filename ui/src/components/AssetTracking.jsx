import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '/src/assets/images/Premium Vector _ Abstract technology white and gray color modern background.jpeg'; // Update with the correct path to your image

const AssignedAssets = () => {
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false); // Flag to indicate if editing
    const [currentAssignment, setCurrentAssignment] = useState(null); // For editing
    const [userId, setUserId] = useState('');
    const [assetId, setAssetId] = useState('');
    // const [assetName, setAssetName] = useState('');
    const [assignmentDate, setAssignmentDate] = useState('');
    const [users, setUsers] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const fetchAssignedAssets = async () => {
            try {
                const response = await axios.get('/api/assignments');
                setAssignedAssets(response.data);
            } catch (error) {
                console.error('Error fetching assigned assets:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await axios.get('/api/assets');
                setAssets(response.data);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchAssignedAssets();
        fetchUsers();
        fetchAssets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                // Update existing assignment
                const response = await axios.put(`/api/assignments/${currentAssignment._id}`, { userId, assetId, assignmentDate }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    setAssignedAssets(prevAssets => prevAssets.map(assignment =>
                        assignment._id === currentAssignment._id ? response.data : assignment
                    ));
                    setModalOpen(false);
                }
            } else {
                // Create new assignment
                const response = await axios.post('/api/assignments', { userId, assetId, assignmentDate }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 201) {
                    setAssignedAssets(prevAssets => [
                        ...prevAssets,
                        response.data
                    ]);
                    setModalOpen(false);
                }
            }
            setUserId('');
            setAssetId('');
            // setAssetName('');
            setAssignmentDate('');
            setEditMode(false);
            setCurrentAssignment(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    const handleEdit = (assignment) => {
        setCurrentAssignment(assignment);
        setUserId(assignment.userId);
        setAssetId(assignment.assetId);
        setAssignmentDate(new Date(assignment.assignmentDate).toISOString().split('T')[0]);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/assignments/${id}`);
            if (response.status === 200) {
                setAssignedAssets(prevAssets => prevAssets.filter(assignment => assignment._id !== id));
            }
        } catch (error) {
            console.error('Error deleting assignment:', error);
            alert('Error deleting assignment');
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
        <div className="container mx-auto p-4 mt-40 p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="text-2xl text-center font-bold mb-4">Assigned Assets</div>
            <button
                onClick={() => {
                    setModalOpen(true);
                    setEditMode(false);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mb-4"
            >
                Add Assignment
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <div className="text-xl font-bold mb-4">{editMode ? 'Edit Assignment' : 'Assign Asset'}</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-900">User ID:</label>
                                <select
                                    id="userId"
                                    name="userId"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user._id} value={user.userId}>{user.userId}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="assetId" className="block text-sm font-medium text-gray-900">Asset ID:</label>
                                <select
                                    id="assetId"
                                    name="assetId"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    value={assetId}
                                    onChange={(e) => setAssetId(e.target.value)}
                                >
                                    <option value="">Select Asset</option>
                                    {assets.map(asset => (
                                        <option key={asset._id} value={asset.assetId}>{asset.assetId}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="assignmentDate" className="block text-sm font-medium text-gray-900">Assignment Date:</label>
                                <input
                                    type="date"
                                    id="assignmentDate"
                                    name="assignmentDate"
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                    value={assignmentDate}
                                    onChange={(e) => setAssignmentDate(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                                >
                                    {editMode ? 'Update' : 'Assign'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="w-full bg-gray-300 rounded-md overflow-hidden mt-4">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="border px-4 py-2">User ID</th>
                        <th className="border px-4 py-2">Asset ID</th>
                        <th className="border px-4 py-2">Assignment Date</th>
                        {/* <th className="border px-4 py-2">Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {assignedAssets.map(assignment => (
                        <tr key={assignment._id}>
                            <td className="border px-4 py-2">{assignment.userId}</td>
                            <td className="border px-4 py-2">{assignment.assetId}</td>
                            <td className="border px-4 py-2">{new Date(assignment.assignmentDate).toLocaleDateString()}</td>
                            {/* <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(assignment)}
                                    className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(assignment._id)}
                                    className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AssignedAssets;