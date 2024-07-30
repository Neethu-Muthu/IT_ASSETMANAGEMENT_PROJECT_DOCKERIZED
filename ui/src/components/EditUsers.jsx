import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditUsers = () => {
    const [userData, setUserData] = useState({
        userId: '',
        username: '',
        email: '',
        role: '',
        password: ''
        
    });
    const { id } = useParams(); // Get asset ID from URL

    useEffect(() => {
        if (id) {
            // Fetch asset details if an ID is provided
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`/api/users/${id}`);
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching asset details:', error);
                }
            };

            fetchUserDetails();
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to edit asset');
            }

            // Clear form fields on successful submission (optional)
            setUserData({
                 userId: '',
                 username: '',
                 email: '',
                 role: '',
                 password: ''
            });

            // Redirect or show success message
            alert('Asset edited successfully');
            // Example redirect:
            window.location.href = '/user-management'; // Redirect to asset inventory page
        } catch (error) {
            console.error('Error editing asset:', error);
            // Handle error gracefully, e.g., display an error message
            alert('Failed to edit asset. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4 w-1/2 mt-10 p-6 bg-gray-100 rounded-lg">
            <div className="text-2xl text-center font-bold mb-4 text-black">
                {id ? 'Edit User' : 'Add New User'}
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" id="userForm">
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                        User ID:
                    </label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        placeholder="Enter user ID"
                        value={userData.userId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                        readOnly={id ? true : false} // Make ID field read-only if editing
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        User Name:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter user name"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Asset Type:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter asset type"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role:
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="Enter asset model"
                        value={userData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Enter serial number"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                        Purchase Date:
                    </label>
                    <input
                        type="date"
                        id="purchaseDate"
                        name="purchaseDate"
                        value={assetData.purchaseDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">
                        Warranty:
                    </label>
                    <input
                        type="text"
                        id="warranty"
                        name="warranty"
                        placeholder="Enter warranty details"
                        value={assetData.warranty}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter asset location"
                        value={assetData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div> */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-gray-400 text-gray-700 py-2 px-4 ml-2 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                        onClick={() => {
                            // Optionally handle cancel action
                            window.location.href = '/user-management'; // Example redirect to asset inventory page
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUsers;
