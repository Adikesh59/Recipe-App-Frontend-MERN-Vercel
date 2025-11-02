import React, { useState } from "react";
import "./waveStyle.css";
import { AppContext } from "../context/App_Context";
import { useContext } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { login } = useContext(AppContext);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await login(gmail, password);
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

    if(result.data.message !== 'User not exist'){
    setTimeout(() => {
      navigate('/home')
    }, 1500);      
    }

  };

  const heading = "Login";
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
              <form onSubmit={loginHandler}>
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
                    Login
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

export default Login;
