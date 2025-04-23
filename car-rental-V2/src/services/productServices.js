import { baseUrl, apiKey } from "@/config/apiUrlConfig";
import toast from "react-hot-toast";

export const handleCarProduct = async () => {
  try {
    const response = await fetch(`${baseUrl}carData`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error("Invalid response format");
    }

    const decodedConfig = JSON.parse(atob(responseData.data));
    if (response.ok) {
    return decodedConfig;
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    alert( error);
  }
};

export const handleUploadData = async ({ setUploadProgress, setIsLoading, username, carName, price, rent, image, refreshForm }) => {
  const token = localStorage.getItem('token');
  // const idToken = await user.getIdToken();

  const formData = new FormData();
  formData.append("username", username);
  formData.append("carName", carName);
  formData.append("price", price);
  formData.append("rent", rent);
  image.forEach((img) => formData.append("images", img));

  try {
    setIsLoading(true);

    // Simulate stepped progress (25 → 50 → 75) before actual upload completes
    setUploadProgress(25);
    await new Promise((res) => setTimeout(res, 300));
    setUploadProgress(50);
    await new Promise((res) => setTimeout(res, 300));
    setUploadProgress(75);
    await new Promise((res) => setTimeout(res, 300));

    const response = await fetch(`${baseUrl}ownerData`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setUploadProgress(100);
      toast(data.message);
      refreshForm();
    } else {
      toast("Failed to upload", {
        style: { background: "#ff3333", color: "#111119" },
      });
    }
  } catch (err) {
    alert(err.message || "Upload error");
  } finally {
    setIsLoading(false);
    setTimeout(() => setUploadProgress(0), 1000); // Reset progress after a short delay
  }
}

export const handleGetOwnerCarList = async ({username}) => {
  try {
    const res = await fetch(`${baseUrl}carData/${username}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch cars:", err);
  }
}

export const handleDeleteProduct = async ({ id, selectedCars, setSelectedCars, setCars }) => {
    if (!selectedCars.includes(id)) {
      toast("Please select car before deleting", {
        style: { background: "#ff3333", color: "#111119" },
      });
      return;
    }

    try {
      const response = await fetch(`${baseUrl}carData/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        toast(data.message);
        setCars((prev) => prev.filter((car) => car.id !== id));
        setSelectedCars((prev) => prev.filter((i) => i !== id));
      } else {
        toast("Failed to delete", {
          style: { background: "#ff3333", color: "#111119" },
        });
      }
    } catch (err) {
      alert(err);
    }
  };