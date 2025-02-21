// import React from 'react';
// import { FaEye, FaPlus } from 'react-icons/fa'; 
// import { Link } from 'react-router-dom'; 

// const Home = () => {
//     return (
//         <div className="min-h-screen  flex flex-col items-center justify-center ">
//             <div className="text-center">
//                 <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1> 
//                 <p className="text-lg mb-8">Organize your life, one task at a time.</p>
//                 <Link to="/addTask">
//     <button className="bg-white py-3 px-6 rounded-lg font-semibold  flex items-center space-x-2 w-full justify-center"> 
//         <FaPlus className="text-xl rounded-lg" />
//         <span>Add Task</span>
//     </button>
// </Link>

// <Link to="/allTasks">
//     <button className="bg-white py-3 px-6 rounded-lg font-semibold  flex items-center space-x-2 w-full justify-center"> 
//         <FaEye className="text-xl rounded-lg" />
//         <span>View Task</span>
//     </button>
// </Link>
//             </div>
//         </div>
//     );
// };

// export default Home;



import React from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white"> 
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg">
                <h1 className="text-5xl font-bold mb-4 text-gray-100">Welcome to Task Manager</h1>
                <p className="text-lg mb-8 text-gray-300">Organize your life, one task at a time.</p>

                <div className="space-y-4">
                    <Link to="/addTask">
                        <button className="bg-blue-600 hover:bg-blue-500 transition duration-300 py-3 px-6 mb-6 rounded-lg font-semibold flex items-center space-x-2 w-full justify-center shadow-md">
                            <FaPlus className="text-xl" />
                            <span>Add Task</span>
                        </button>
                    </Link>

                    <Link to="/allTasks">
                        <button className="bg-green-600 hover:bg-green-500 transition duration-300 py-3 px-6 rounded-lg font-semibold flex items-center space-x-2 w-full justify-center shadow-md">
                            <FaEye className="text-xl" />
                            <span>View Tasks</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
