import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddAssetForm = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        assetId: assetId || '',
        assetName: '',
        scheduledDate: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (assetId) {
                // Update existing asset
                await axios.put(`/api/assets/${assetId}`, formData);
            } else {
                // Add new asset
                await axios.post('/api/assets', formData);
            }
            navigate('/technician-dashboard');
        } catch (error) {
            console.error('Error saving asset:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="space-x-4">
                    <a href="/technician-dashboard" className="text-blue-600 hover:text-gray-900">Home</a>
                </div>
                <div className="space-x-4">
                    <a href="/" className="text-blue-600 hover:text-gray-900">Logout</a>
                </div>
            </nav>

            {/* Form Content */}
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Asset Details</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="assetId" className="block text-sm font-medium text-gray-700">Asset ID</label>
                            <input
                                type="text"
                                id="assetId"
                                name="assetId"
                                value={formData.assetId}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                required
                                readOnly={!!assetId}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="assetName"
                                name="assetName"
                                value={formData.assetName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                required
                                readOnly={!!assetId}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                            <input
                                type="date"
                                id="scheduledDate"
                                name="scheduledDate"
                                value={formData.scheduledDate}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Repair">Repair</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAssetForm;
