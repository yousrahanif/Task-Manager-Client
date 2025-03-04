



import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const AllTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://task-server-phi-one.vercel.app/myTask/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                            setTasks(prevItems => prevItems.filter(item => item._id !== _id));
                        }
                    });
            }
        });
    };

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("taskId", task._id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

   
   
   
  
    




    const handleDrop = (e, category) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        const movedTask = tasks.find(task => task._id === taskId);
        
        if (movedTask && movedTask.category !== category) {
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, category: category }; 
                }
                return task;
            });
    
            const reorderedTasks = updatedTasks.map((task, index) => ({
                ...task,
                order: index + 1,
            }));
    
            setTasks(reorderedTasks);
    
            fetch('https://task-server-phi-one.vercel.app/updateTaskOrder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reorderedTasks),
            })
                .then(response => response.json())
                .then(data => console.log('Tasks updated successfully:', data))
                .catch(error => console.error('Error updating order:', error));
        } else if (movedTask && movedTask.category === category) { // 
            const updatedTasks = [...tasks];
            const movedTaskIndex = updatedTasks.findIndex(task => task._id === taskId);
            const [removedTask] = updatedTasks.splice(movedTaskIndex, 1); 
            const dropIndex = updatedTasks.findIndex(task => task._id === e.target.dataset.taskId);
        
          
            updatedTasks.splice(dropIndex, 0, removedTask);
        
      
            const reorderedTasks = updatedTasks.map((task, index) => ({
                ...task,
                order: index + 1, 
            }));
        
            setTasks(reorderedTasks);
        
            fetch('https://task-server-phi-one.vercel.app/updateTaskOrder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reorderedTasks),
            })
                .then(response => response.json())
                .then(data => console.log('Tasks updated successfully:', data))
                .catch(error => console.error('Error updating order:', error));
        }
    };
    
   
    useEffect(() => {
        if (user) {
            fetch(`https://task-server-phi-one.vercel.app/myTasks?email=${user.email}`)
                .then(response => {
                    if (!response.ok) {
                        return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
                    }
                    return response.json();
                })
                .then(data => setTasks(data))
                .catch(err => {
                    setError(err);
                    console.error("Error fetching tasks:", err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

  

    const todoTasks = tasks.filter(task => task.category === "To-Do").sort((a, b) => a.order - b.order);
    const inProgressTasks = tasks.filter(task => task.category === "In Progress").sort((a, b) => a.order - b.order);
    const doneTasks = tasks.filter(task => task.category === "Done").sort((a, b) => a.order - b.order);

 




    return (
        <div className="mx-auto w-11/12">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center mt-4">
                {[{ title: "To-Do", tasks: todoTasks }, { title: "In Progress", tasks: inProgressTasks }, { title: "Done", tasks: doneTasks }].map((section) => (
                    <div
                        key={section.title}



                        className={`bg-gray-100 p-4 rounded-lg shadow-md ${ 
                            section.title === "To-Do" ? "bg-red-200" : 
                            section.title === "In Progress" ? "bg-blue-200" : 
                            section.title === "Done" ? "bg-green-200" : "" 
                        }`}


                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, section.title)}
                    >
                        <h3 className="text-2xl font-semibold mb-3 text-center">{section.title}</h3>
                        <ul>
                            {section.tasks.map((task) => (
                                <li
                                    key={task._id}
                                    className="p-2 mb-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition duration-200 cursor-move"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task)}
                                >
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">Title: {task.title}</span>
                                            <div className="flex space-x-2">
                                                <NavLink to={`/updateTask/${task._id}`}>
                                                    <button>
                                                        <FaEdit className="text-blue-500 cursor-pointer" />
                                                    </button>
                                                </NavLink>
                                                <button onClick={() => handleDelete(task._id)}>
                                                    <FaTrash className="text-red-500 cursor-pointer" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-1">Description: {task.description}</p>


                                        {task.timestamp && (
                                        <p className="text-gray-500 text-sm mt-1">
                                            Added: {moment(task.timestamp).format("YYYY-MM-DD")} 
                                        </p>
                                    )}


                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
    



};

export default AllTasks;