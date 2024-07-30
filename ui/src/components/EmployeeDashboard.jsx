import React, { useEffect, useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
import backgroundImage from '/src/assets/images/pexels-karolina-grabowska-4467735.jpg';


const EmployeeDashboard = () => {
   
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [employee, setEmployee] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch('/api/getEmployees');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log(data, "employee data");
                setEmployee(data);
                fetchAssignedAssets(data.userId);  // Fetch assigned assets after setting employee state
            } catch (error) {
                setError('Failed to fetch employee details');
                console.error('Error fetching employee details:', error);
            }
        };

        const fetchAssignedAssets = async (userId) => {
            try {
                const response = await fetch(`/api/assigned-assets/employee/${userId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log(data, "assigned assets");
                setAssignedAssets(Array.isArray(data) ? data : []);
            } catch (error) {
                setError('Failed to fetch assigned assets');
                console.error('Error fetching assigned assets:', error);
            }
        };

        fetchEmployeeDetails();
    }, []);

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="space-x-4">
                    <a href="/" className="text-blue-600 hover:text-gray-900">Home</a>
                </div>
                <div className="text-xl font-bold">Employee Dashboard</div>
                <div className="space-x-4">
                    <a href="/" className="text-blue-600 hover:text-gray-900">Logout</a>
                </div>
            </nav>
            <div className="container max-w-6xl mt-10 p-6 bg-white bg-opacity-80 rounded-lg mx-auto shadow-lg">
                {/* <div className="text-2xl font-bold text-center mb-6 text-black">Employee Dashboard</div> */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="text-center text-3xl mb-4 text-black bg-blue-100 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">Keep shining,</span> <span className="font-bold text-blue-600">{employee.username}</span>! Your efforts are inspiring!
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Asset ID</th>
                                <th className="px-6 py-3 text-xs font-medium text-black uppercase tracking-wider">Assigned Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedAssets.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No assigned assets</td>
                                </tr>
                            ) : (
                                assignedAssets.map(asset => (
                                    <tr key={asset.assetId} className="border-b border-gray-200">
                                        <td className="px-6 py-4">{asset.assetId}</td>
                                        <td className="px-6 py-4">{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
