import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App_Context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AppContext);
  const [localUser, setLocalUser] = useState(null);
  const [pulse, setPulse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.name) {
      setLocalUser(user);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  // Disco pulse when user clicks anywhere
  useEffect(() => {
    const handleClick = () => {
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (!localUser) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
          color: "#fff",
        }}
      >
        <h3 className="fw-bold">Loading your profile...</h3>
      </div>
    );
  }

  const randomAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${localUser.name}`;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          * { font-family: 'Poppins', sans-serif; }

          @keyframes disco {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes spinGlow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          .disco-bg {
            background: linear-gradient(-45deg, #ff6a00, #ee0979, #00c9ff, #92fe9d);
            background-size: 400% 400%;
            animation: disco 8s ease infinite;
            transition: filter 0.2s ease;
          }

          .pulse {
            filter: brightness(1.5) saturate(2);
          }

          .profile-card {
            transition: all 0.4s ease;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 25px;
            box-shadow: 0 8px 40px rgba(255,255,255,0.3);
            position: relative;
            overflow: hidden;
          }

          .avatar-wrapper {
            position: relative;
            animation: float 3s ease-in-out infinite;
          }

          .avatar-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(#ff6a00, #ee0979, #00c9ff, #92fe9d, #ff6a00);
            transform: translate(-50%, -50%);
            filter: blur(3px);
            animation: spinGlow 5s linear infinite;
            z-index: 0;
          }

          .avatar {
            position: relative;
            z-index: 2;
            border: 5px solid white;
            border-radius: 50%;
            transition: transform 0.5s ease;
          }

          .avatar:hover {
            transform: scale(1.15);
          }

          .text-glow {
            background: linear-gradient(90deg, #ff6a00, #ee0979, #00c9ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 10px rgba(255,255,255,0.4);
          }

          .sparkle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            opacity: 0;
            animation: sparkle 2s infinite ease-in-out;
          }

          .sparkle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 40%; right: 15%; animation-delay: 0.5s; }
          .sparkle:nth-child(3) { bottom: 25%; left: 30%; animation-delay: 1s; }
          .sparkle:nth-child(4) { bottom: 15%; right: 25%; animation-delay: 1.5s; }

          .btn-glow {
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            border-radius: 12px;
            background: linear-gradient(90deg, #ff6a00, #ee0979, #00c9ff);
            color: #fff;
            font-weight: 600;
            box-shadow: 0 0 20px rgba(255,255,255,0.3);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .btn-glow:hover {
            transform: scale(1.1) rotate(3deg);
            box-shadow: 0 0 30px rgba(255,255,255,0.6);
            filter: brightness(1.3);
          }
        `}
      </style>

      <div
        className={`d-flex justify-content-center align-items-center vh-100 disco-bg ${
          pulse ? "pulse" : ""
        }`}
      >
        <div className="card text-center p-5 profile-card" style={{ width: "360px" }}>
          {/* Sparkles */}
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>

          {/* Avatar */}
          <div className="avatar-wrapper mb-4">
            <div className="avatar-ring"></div>
            <img
              src={randomAvatar}
              alt="User Avatar"
              className="avatar"
              width="130"
              height="130"
            />
          </div>

          {/* Name + Gmail */}
          <h3 className="fw-bold mb-2 text-glow">{localUser.name}</h3>
          <p className="text-light mb-3">
            <i className="bi bi-envelope-fill me-2"></i>
            {localUser.gmail}
          </p>

          {/* Back to Home Button */}
          <button
            className="btn-glow"
            onClick={() => navigate("/home")}
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
