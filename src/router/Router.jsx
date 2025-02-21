import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import AddTask from "../components/AddTask";
import UpdateTask from "../components/UpdateTask";
import Register from "../components/Register";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import AllTasks from "../components/AllTasks";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <MainLayout />,
    errorElement: <h2>Route Not found</h2>,
    children: [
      { path: '/', element: <Home /> },
      { path: 'addTask', element: <PrivateRoute>
        <AddTask />,
      </PrivateRoute> },
      { path: 'updateTask', element: <PrivateRoute>
         <UpdateTask />
      </PrivateRoute> },
      { path: 'allTasks', element: <PrivateRoute>
        <AllTasks></AllTasks>
      </PrivateRoute> },

{
  path:'/updateTask/:id',
  element: <PrivateRoute>
  <UpdateTask></UpdateTask>
  </PrivateRoute>,
loader: ({ params }) => fetch(`https://task-server-phi-one.vercel.app/allTasks/${params.id}`),


},
    ],
  },
  { 
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  
]);

  export default router;