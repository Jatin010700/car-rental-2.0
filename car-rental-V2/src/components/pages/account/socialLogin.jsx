import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsernameState } from "@/redux/store";
import { useAuth } from '@/auth/authContext';
import { handleGoogleLogin } from "@/services/socialServices";
import { handleFirebaseConfig } from "@/services/socialServices";

export default function SocialLogin() {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    const fetchFirebaseConfig = async () => {
      const config = await handleFirebaseConfig();
      setFirebaseConfig(config);
    };

    fetchFirebaseConfig();
  }, []);

  const handleSubmit = async () => {
    handleGoogleLogin({
      navigate,
      dispatch,
      firebaseConfig,
      setUsernameState,
      handleLogin
    })
  }

  const iconList = [
    <i key="google" className="bi bi-google" onClick={handleSubmit}></i>,
    <i key="facebook" className="bi bi-facebook"></i>,
    <i key="microsoft" className="bi bi-microsoft"></i>,
    <i key="twitter" className="bi bi-twitter"></i>,
    <i key="instagram" className="bi bi-instagram"></i>,
  ];

  return (
    <>
      {iconList.map((icon, index) => (
        <div
          key={index}
          className="transition ease-in-out hover:scale-105 duration-150 cursor-pointer iconStyle">
          {icon}
        </div>
      ))}
    </>
  );
}
