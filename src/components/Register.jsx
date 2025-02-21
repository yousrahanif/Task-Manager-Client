import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password)
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long, include an uppercase letter, and include a lowercase letter.",
      });
      return;
    }

    createUser(email, password)
      .then(() => {
        e.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="hero bg-base-400 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <div className="flex justify-center">
            <NavLink to="/" className="text-center">
              <FaHome className="text-5xl" />
            </NavLink>
          </div>
          <h1 className="text-2xl font-bold">Register Now!</h1>
        </div>
        <div className="card bg-base-400 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="btn btn-xs absolute right-2 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-blue-300 via-blue-400 to-purple-300">
                Register
              </button>
            </div>
            <p>
              Already have an account?{" "}
              <Link className="text-blue-600" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
