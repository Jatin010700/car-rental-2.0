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

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    alert( error);
  }
};

export const handleUploadData = async ({ setIsLoading, userName, carName, price, rent, image, refreshForm }) => {
  const token = localStorage.getItem('token');
  const idToken = await user.getIdToken();
  try {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("carName", carName);
    formData.append("price", price);
    formData.append("rent", rent);
    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    const response = await fetch(`${baseUrl}ownerData`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token || idToken}`,
        },
        body: formData,
    });

    if (!token || !idToken) return res.status(401).send('Access denied');

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false)
      toast(data.message);
      refreshForm();
    } else {
      toast("Fail to upload", {
        style: {
          background: "#ff3333",
          color: "#111119"
        },
      });
      setIsLoading(false)
    }
  } catch (error) {
    alert(error);
  }
}