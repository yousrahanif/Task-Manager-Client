import { useContext, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const navigate= useNavigate()
  const emailRef=useRef()
  const {signInUser, signInWithGoogle} = useContext(AuthContext)
    const handleLogin=(e)=>{
        e.preventDefault()
        const email=e.target.email.value
        const password=e.target.password.value
// console.log(email,password)
signInUser(email,password)
.then(result=>{
  // console.log(result.user)
  e.target.reset()
  navigate("/")
  Swal.fire({
    title: "Good job!",
    text: "Login successful!",
    icon: "success",
  });
})
.catch(error=>{
// console.log('ERRROR', error.message)
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  
});
})

    }
    const handleGoogleSignIn=()=>{
      signInWithGoogle()
      .then(result=>{
        // console.log(result.user)
        //
       
        navigate("/")
        Swal.fire({
          title: "Good job!",
          text: "Login successful!",
          icon: "success",
        });
      })
      .catch(error=>{
      // console.log('ERRROR', error.message)
      })
    }
  
  
    return (
        <div className="hero bg-base-400 min-h-screen">

        <div className="hero-content flex-col ">
          <div className="text-center ">
            <div className="flex justify-center">
            <NavLink to="/" className="text-center"> <FaHome className="text-5xl"></FaHome> </NavLink>

            </div>
            <h1 className="text-2xl font-bold">Login Now!</h1>
           
          </div>
          <div className="card bg-base-400 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" ref={emailRef} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
               
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-r from-blue-300 via-blue-400 to-purple-300  ">Login</button>
              </div>
              <p>New To Here? Please <Link className="text-blue-600" to="/register">Register</Link></p>
            </form>
            <p className="flex justify-center items-center pb-4">
              <button onClick={handleGoogleSignIn} className="btn bg-gradient-to-r from-blue-300 via-blue-400 to-purple-300   ">Google</button>
            </p>
          </div>
          
        </div>
      </div>
    );
};

export default Login;