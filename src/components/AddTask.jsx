import React, { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState({
        title: '',
        description: '',
        category: 'To-Do',
    });
    const [errors, setErrors] = useState({}); // State to store validation errors

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
    };

    const handleAddTask = e => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        const title = task.title;
        const description = task.description;
        const category = task.category;

        let isValid = true;
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
            isValid = false;
        } else if (title.length > 50) {
            newErrors.title = "Title must be less than 50 characters";
            isValid = false;
        }

        if (description.length > 200) {
            newErrors.description = "Description must be less than 200 characters";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return; // Stop form submission
        }


        const newTask = {
            title,
            description,
            category,
            email: user?.email,
            userId: user?.uid,
            timestamp: new Date().toISOString(),
        };

        fetch('https://task-server-phi-one.vercel.app/addTask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => {
                if (!res.ok) {
                    return res.text().then(err => { throw new Error(err) });
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Task added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    e.target.reset();
                    setTask({
                        title: '',
                        description: '',
                        category: 'To-Do',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: data.message || 'Failed to add task',
                    });
                }
            })
            .catch(error => {
                console.error("Error adding task:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: error.message || 'A network error occurred. Please try again later.',
                });
            });

    }

    return (
        <div className='lg:w-3/4 mx-auto'>
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold">Add Task!</h1>
            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                
                <form onSubmit={handleAddTask} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            name='title'
                            value={task.title}
                            onChange={handleChange}
                            placeholder="task title"
                            className={`input input-bordered ${errors.title ? 'border-red-500' : ''}`} 
                            required
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>} 
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            name='description'
                            value={task.description}
                            onChange={handleChange}
                            placeholder="task description"
                            className={`textarea textarea-bordered ${errors.description ? 'border-red-500' : ''}`} // Conditional styling
                        />
                        {errors.description && <p className="text-red-500">{errors.description}</p>} {/* Error message */}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            name='category'
                            value={task.category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;




