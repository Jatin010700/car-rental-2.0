import React from "react";
import { auth, provider, signInWithPopup } from "../../extra/firebase_Config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user_action/action";
import { setUsernameState } from "../../redux/store/store";
import { useAuth } from '../../extra/authContext';

export function Icon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch(
        "https://car-rental-back.onrender.com/api/google-auth",
        // "http://localhost:5000/api/google-auth",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (response.status === 200) {
        const data = await response.json();
        navigate("/");
        handleLogin({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          token: idToken
        });
        const googleUsername = user.displayName;
        dispatch(setUsernameState(googleUsername));
        dispatch(login());
      } else {
        console.error("Google Auth failed:", response);
      }
    } catch (error) {
      console.error("SERVER ERROR:", error);
    }
  };

  const iconList = [
    <i key="google" className="bi bi-google" onClick={handleGoogleLogin}></i>,
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
