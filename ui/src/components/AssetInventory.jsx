import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AssetInventory = () => {
    const [assets, setAssets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAssets, setFilteredAssets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter assets whenever searchQuery changes
        const filtered = assets.filter(asset => {
            return (
                asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.assetType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                asset.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredAssets(filtered);
    }, [searchQuery, assets]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/assets');
            setAssets(response.data);
            setFilteredAssets(response.data); // Set initial filtered assets
        } catch (error) {
            console.error('Error fetching assets:', error);
            // alert('Failed to fetch assets.');
        }
    };

    const handleEditAsset = (assetId) => {
        window.location.href = `/edit-asset/${assetId}`;
    };

    const handleDeleteAsset = async (assetId) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await axios.delete(`/api/assets/${assetId}`);
                setAssets(assets.filter(asset => asset.assetId !== assetId));
                setFilteredAssets(filteredAssets.filter(asset => asset.assetId !== assetId));
                alert('Asset deleted successfully!');
            } catch (error) {
                console.error('Error deleting asset:', error);
                // alert('Failed to delete asset.');
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
                <div className="text-2xl font-bold text-center mb-6 text-black">Asset Inventory Management</div>
                <div className="text-right mb-6">
                    <Link to="/add-newAsset">
                        <button className="bg-blue-400 text-white rounded px-4 py-2 hover:bg-blue-600">Add New Asset</button>
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
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Asset ID</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Asset Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Asset Type</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Model</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Serial Number</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Purchase Date</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Warranty</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset.assetId} className="border-b border-gray-200">
                                    <td className="px-6 py-4">{asset.assetId}</td>
                                    <td className="px-6 py-4">{asset.assetName}</td>
                                    <td className="px-6 py-4">{asset.assetType}</td>
                                    <td className="px-6 py-4">{asset.model}</td>
                                    <td className="px-6 py-4">{asset.serialNumber}</td>
                                    <td className="px-6 py-4">{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{asset.warranty}</td>
                                    <td className="px-6 py-4">{asset.location}</td>
                                    <td className="px-6 py-4">
                                        <div className='flex'>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                                onClick={() => handleEditAsset(asset.assetId)}>Edit</button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
                                                onClick={() => handleDeleteAsset(asset.assetId)}>Delete</button>
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

export default AssetInventory;
