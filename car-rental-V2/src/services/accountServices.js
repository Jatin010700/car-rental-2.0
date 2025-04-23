import { baseUrl } from "@/config/apiUrlConfig";
import toast from "react-hot-toast";
import useUserStore from "@/zustand_store/userStore";

// LOGIN USER
export const handleLogin = async ({ userValue, passValue, setIsLoading, setUser, userToken, navigate }) => {
  try {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: userValue,
          password: passValue,
        }),
    });

    const data = await response.json();

    if (response.ok) {
      toast(`Hello ${userValue}`);

      const token = data.token;
      if (!token) {
        throw new Error("NO TOKEN FOUND");
      }

      localStorage.setItem("token", token);
      userToken(token);
      setUser(userValue);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast(data.error, {
        style: {
          background: "#ff3333",
          color: "#111119"
        },
      });
      setIsLoading(false);
    }
  } catch (error) {
    alert(error);
  }
};

// REGISTER USER
export const handleRegister = async ({ userValue, passValue, emailValue, setIsLoading, navigate }) => {
  try {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        username: userValue,
        password: passValue,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast(`${data.message}`, { position: "top-center" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast(data.error, {
        style: {
          background: "#ff3333",
          color: "#111119"
        },
      });

      setIsLoading(false);
    }
  } catch (error) {
    alert(error);
  }
}

// LOGOUT
export const handleLogout = async ({ navigate, username }) => {
    try {
      const response = await fetch(`${baseUrl}logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
      });

      const data = await response.json();

      if (response.ok) {
        toast(`Bye Bye ${username}`);
        localStorage.removeItem("token");
        useUserStore.getState().logout();
        navigate("/");
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      alert(error);
    }
  }