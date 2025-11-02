import React, { useContext, useState } from "react";
import "./waveStyle.css";
import { AppContext } from "../context/App_Context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, gmail, password);
    console.log(result.data);

    // Toastify code
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //Toastify code end
    if (result.data.message !== "User is already exists...") {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
  const heading = "Register";
  return (
    <>
      {/* Toastify */}
      <ToastContainer />
      {/* Toastify End */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow p-4">
              {/* Applying Wave style animation in Login Heading */}
              {/* Code start */}
              {/* <h2 className="text-center mb-4 waveStyle">Login</h2> */}
              {/* Letter-by-letter wave heading */}
              <h2 className="mb-4 text-center">
                {heading.split("").map((char, index) => (
                  <span
                    key={index}
                    className="waveLetter"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              {/* Code end */}
              <form onSubmit={registerHandler}>
                {/* Name field */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email field */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password field */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Login button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register Now !
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
