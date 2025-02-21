// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
// import { useContext } from "react";

// const Navbar = () => {
//       const { user, signOutUser } = useContext(AuthContext); 
  
    
//     return (
//         <div>
//           <div className="navbar bg-base-100 sticky top-0 z-50">
//   <div className="navbar-start">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h8m-8 6h16" />
//         </svg>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//        <NavLink to="/allTasks">
//         All Tasks
//        </NavLink>
//        <NavLink to='addTask' >
//         Add Task
//        </NavLink>

//       </ul>
//     </div>
//     <NavLink to="/" className="btn btn-ghost text-xl">TaskTracker</NavLink>
//   </div>
//   <div className="navbar-center hidden lg:flex">
//     <ul className="menu menu-horizontal px-1 py-2">
//     <NavLink to="/allTasks" className="ml-2 mr-2 text-2xl">
//         All Tasks
//        </NavLink>
//        <NavLink to='addTask' className="text-2xl">
//         Add Task
//        </NavLink>
//     </ul>
//   </div>
//   <div className="navbar-end">


// {user ? ( 
//             <button className="btn" onClick={signOutUser}>
//               Logout
//             </button>
//           ) : (
//             <NavLink to="/login">
//               <button className="btn">Login</button>
//             </NavLink>
//           )}
//   </div>
// </div>
//         </div>
//     );
// };

// export default Navbar;

import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { FaClock } from "react-icons/fa";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    return (
        <div className="navbar bg-base-300 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} htmlFor="dropdown-menu" className="btn btn-ghost lg:hidden"> {/* htmlFor for accessibility */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} id="dropdown-menu" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"> {/* id for htmlFor */}
                        <li> 
                            <NavLink to="/allTasks" className={({ isActive }) => `text-lg ${isActive ? 'font-bold' : ''}`}>
                                All Tasks
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/addTask" className={({ isActive }) => `text-lg ${isActive ? 'font-bold' : ''}`}>
                                Add Task
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl"><FaClock className=""></FaClock> TaskTracker</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 py-2">
                    <li> 
                        <NavLink to="/allTasks" className={({ isActive }) => `text-lg ${isActive ? 'font-bold' : ''}`}>
                            All Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/addTask" className={({ isActive }) => `text-lg ${isActive ? 'font-bold' : ''}`}>
                            Add Task
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <button className="btn" onClick={signOutUser}>
                        Logout
                    </button>
                ) : (
                    <NavLink to="/login">
                        <button className="btn">Login</button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;