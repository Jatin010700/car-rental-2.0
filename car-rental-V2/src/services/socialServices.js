import { baseUrl, apiKey } from "@/config/apiUrlConfig";
import toast from "react-hot-toast";
import { login } from "@/redux/action";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const handleFirebaseConfig = async () => {
  try {
    const response = await fetch(`${baseUrl}firebaseConfig`, {
      method: "GET",
      credentials: "include",
      headers: {
        "x-api-key": apiKey,
      },
    });
    const config = await response.json();
    return config;
  } catch (error) {
    alert(error);
  }
}

export const handleGoogleLogin = async ({ navigate, dispatch, setUsernameState, firebaseConfig, handleLogin }) => {
  if (!firebaseConfig) {
    toast.error("Firebase configuration not loaded yet.");
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();

    const response = await fetch(`${baseUrl}google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (response.ok) {
      const googleUsername = user.displayName;
      toast(`Hello ${googleUsername}`);

      if (!idToken) {
        throw new Error("NO TOKEN FOUND");
      }

      navigate("/");
      handleLogin({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        token: idToken
      });
      dispatch(setUsernameState(googleUsername));
      dispatch(login());
    } else {
      console.error("Google Auth failed:", response);
    }
  } catch (error) {
    alert(error);
  }
}