import React, { useState } from 'react';

const AddNewAsset = () => {
    const [assetData, setAssetData] = useState({
        assetId: '',
        assetName: '',
        assetType: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        warranty: '',
        location: ''
        // Add more fields as needed
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssetData({
            ...assetData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/assets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assetData)
            });

            if (!response.ok) {
                throw new Error('Failed to add asset');
            }

            // Clear form fields on successful submission (optional)
            setAssetData({
                assetId: '',
                assetName: '',
                assetType: '',
                model: '',
                serialNumber: '',
                purchaseDate: '',
                warranty: '',
                location: ''
                // Add more fields as needed
            });

            // Redirect or show success message
            alert('Asset added successfully');
            // Example redirect:
            window.location.href = '/asset-inventory'; // Redirect to asset inventory page
        } catch (error) {
            console.error('Error adding asset:', error);
            // Handle error gracefully, e.g., display an error message
            alert('Failed to add asset. Please try again.');
        }
    };

    return (

        <div className="container mx-auto p-4 w-1/2 mt-10 p-6 bg-gray-100 rounded-lg">

            <div className="text-2xl text-center font-bold mb-4 text-black">Add New Asset</div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" id="assetForm">
                <div className="mb-4">
                    <label htmlFor="assetId" className="block text-sm font-medium text-gray-700">Asset ID:</label>
                    <input
                        type="text"
                        id="assetId"
                        name="assetId"
                        placeholder="Enter asset ID"
                        value={assetData.assetId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">Asset Name:</label>
                    <input
                        type="text"
                        id="assetName"
                        name="assetName"
                        placeholder="Enter asset name"
                        value={assetData.assetName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="assetType" className="block text-sm font-medium text-gray-700">Asset Type:</label>
                    <input
                        type="text"
                        id="assetType"
                        name="assetType"
                        placeholder="Enter asset type"
                        value={assetData.assetType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Enter asset model"
                        value={assetData.model}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number:</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        placeholder="Enter serial number"
                        value={assetData.serialNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">Purchase Date:</label>
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
                    <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">Warranty:</label>
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
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
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
                </div>
                {/* Add more fields as needed */}

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
                            window.location.href = '/asset-inventory'; // Example redirect to asset inventory page
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewAsset;
