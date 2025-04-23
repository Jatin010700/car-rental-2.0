import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/auth/authContext';
import { handleGoogleLogin } from "@/services/socialServices";
import { handleFirebaseConfig } from "@/services/socialServices";
import useUserStore from "@/zustand_store/userStore";

export default function SocialLogin() {
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUserStore();
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
      setUser,
      firebaseConfig,
      handleLogin
    })
  }

  const iconList = [
    <i key="google" className="bi bi-google iconStyle" onClick={handleSubmit}></i>,
    <i key="facebook" className="bi bi-facebook iconStyle"></i>,
    <i key="microsoft" className="bi bi-microsoft iconStyle"></i>,
    <i key="twitter" className="bi bi-twitter iconStyle"></i>,
    <i key="instagram" className="bi bi-instagram iconStyle"></i>,
  ];

  return (
    <>
      {iconList.map((icon, index) => (
        <div
          key={index}
          className="transition ease-in-out active:scale-95 hover:scale-105 duration-150 cursor-pointer">
          {icon}
        </div>
      ))}
    </>
  );
}
