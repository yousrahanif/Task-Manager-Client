import React from 'react';
import { FaEye, FaPlus } from 'react-icons/fa'; // Import the add icon
import { Link } from 'react-router-dom'; // For routing

const Home = () => {
    return (
        <div className="min-h-screen  flex flex-col items-center justify-center "> {/* Gradient background */}
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1> {/* Animated title */}
                <p className="text-lg mb-8">Organize your life, one task at a time.</p>
                <Link to="/addTask">
    <button className="bg-white py-3 px-6 rounded-lg font-semibold  flex items-center space-x-2 w-full justify-center"> 
        <FaPlus className="text-xl rounded-lg" />
        <span>Add Task</span>
    </button>
</Link>

<Link to="/allTasks">
    <button className="bg-white py-3 px-6 rounded-lg font-semibold  flex items-center space-x-2 w-full justify-center"> 
        <FaEye className="text-xl rounded-lg" />
        <span>View Task</span>
    </button>
</Link>
            </div>
        </div>
    );
};

export default Home;