import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useLoaderData } from "react-router-dom";

const UpdateTask = () => {
    const task = useLoaderData(); // Fetch data using loader
   console.log(task)
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Initialize state and update once task data is available
    const [post, setPost] = useState(() => {  // Initialize state using a function
        if (task) {
            return {
                title: task.title ?? '',
                description: task.description ?? '',
                category: task.category ?? 'To-Do',
                date: ''
            };
        } else {
            return {  // Initial state if task is not yet loaded
                title: '',
                description: '',
                category: 'To-Do',
                date: task.timestamp ? new Date(task.timestamp).toLocaleDateString() : '',
            };
        }
    });

    useEffect(() => {
        if (task) {
            setPost({
                title: task.title ?? '',
                description: task.description ?? '',
                category: task.category ?? 'To-Do',
                date: task.timestamp ? new Date(task.timestamp).toLocaleDateString() : '', // Ensure date is included

            });
        }
    }, [task]);

    const handleUpdatePost = (event) => {
        event.preventDefault();
        const form = event.target;

        // Collect form values
        const updatedPost = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,

        };

        // Update the post via the API
        fetch(`https://task-server-phi-one.vercel.app/updateTask/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedPost),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Post Updated Successfully',
                        icon: 'success',
                    });
                    navigate('/allTasks');
                }
            })
            .catch((error) => console.error('Error updating post:', error));
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Update Item</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleUpdatePost} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="input input-bordered"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="textarea textarea-bordered"
                                value={post.description}
                                onChange={(e) => setPost({ ...post, description: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name="category"
                                className="select select-bordered w-full max-w-xs"
                                value={post.category}
                                onChange={(e) => setPost({ ...post, category: e.target.value })}
                                required
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className="form-control">
            <label className="label">
                <span className="label-text">Date</span>
            </label>
            <input
                type="text"
                value={post.date}
                className="input input-bordered"
                readOnly 
            />
        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                name="email"
                                className="input input-bordered"
                                readOnly
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                name="name"
                                className="input input-bordered"
                                readOnly
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-blue-300 via-blue-400 to-purple-300">Update Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;
