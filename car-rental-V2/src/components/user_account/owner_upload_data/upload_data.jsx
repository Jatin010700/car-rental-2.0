import React, { useRef, useState } from "react";
import { NavBar } from "../../navbar/navbar";
import { Footer } from "../../main_page/footer";
import { dotPulse } from "ldrs";
import { useSelector } from "react-redux";
dotPulse.register();

export const CarOwner = () => {
  const [image, setImage] = useState([]);
  const [carName, setCarName] = useState("");
  const [price, setPrice] = useState(0);
  const [rent, setRent] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  let [paraValue, setParaValue] = useState("");
  let [success, setSuccess] = useState("");
  const userName = useSelector((state) => state.userName);
  
  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImage([...image, ...Array.from(selectedImages)]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const res = await fetch("https://car-rental-back.onrender.com/api/owner-data", {
        method: "POST",
        body: formData,
        // headers: {
        //   "Authorization": `Bearer ${token}`, // Include the JWT token in the headers
        // },
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsLoading(false)
        setParaValue(data.message);

        setTimeout(() => {
          setParaValue("");
        }, 1000);

        setSuccess(true);
        refreshForm();
      } else {
        const errorData = await res.json();
        setParaValue(errorData.error);

        setTimeout(() => {
          setParaValue("");
        }, 1000);

        setSuccess(false);
        setIsLoading(false)
      }
    } catch (error) {
      setParaValue(error.message);

      setTimeout(() => {
        setParaValue("");
      }, 1000);

      setSuccess(false);
      // alert("An error occurred: " + error.message);
    }
  };

  const isFormValid = () => {
    return image === ([]) || carName === ""
    || price === 0 || rent === 0;
  };

  //Refresh form
  const refreshForm = () => {
    fileInputRef.current.value = null;
    setImage([]);
    setCarName("");
    setPrice(0);
    setRent(0);
  };
  
  return (
    <>
      <NavBar />
      <div className="bg-white w-full py-10 px-16">
        <h1 className="font-bold text-4xl pb-10">
          <span className="underline decoration-yellow">Put yo</span>ur car for sell
        </h1>
        <div className="flex gap-2 flex-col sm:flex-row">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow p-4 mt-2 w-full sm:w-4/6 md:w-2/6 bg-L-black text-white flex flex-col gap-2">
            <h1 className="text-center uppercase font-bold pb-2 text-2xl">
              {userName}
            </h1>
            <p className="text-center underline decoration-yellow">Upload details about your Car on our site</p>
            <p className={`text-center font-bold text-white ${success ? "success" : "error"}`}>
              {paraValue}
            </p>
            <div className="file-upload">
              <label
                htmlFor="fileInput"
                className="custom-file-upload flex gap-2 items-center">
                <i className="text-2xl bi bi-file-earmark-text-fill"></i>
                Upload Image:
                <span
                  className="bg-white text-dark ml-2 py-2 px-4 rounded-lg cursor-pointer font-bold
                             hover:bg-yellow transition ease-in-out active:scale-95 hover:scale-105 duration-150">
                  {selectedFile ? selectedFile.name : "Choose File"}
                </span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Car Name:</label>
              <input
                type="text"
                value={carName}
                className="text-L-black rounded-2xl p-2"
                onChange={(e) => setCarName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Full price:</label>
              <input
                type="number"
                value={price}
                className="text-L-black rounded-2xl p-2"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Rent price:</label>
              <input
                type="number"
                value={rent}
                className="text-L-black rounded-2xl p-2"
                onChange={(e) => setRent(e.target.value)}
              />
            </div>

            <p className="text-sm">
              <span className="text-yellow font-bold text-base">Note: </span>
              Please refresh form if any mistake were made!!
            </p>
            
            <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="py-2 px-2 w-full sm:w-1/4 mt-2 bg-yellow text-L-black hover:bg-yellow hover:text-L-black
              rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150 btn"
              disabled={isFormValid()}
              onClick={handleSubmit}>
                {isLoading ? <l-dot-pulse size="43" speed="1.3" color="#111119" ></l-dot-pulse> : "Submit"}
            </button>
            <button
              type="button"
              className="py-2 px-2 w-full sm:w-1/4 mt-2 bg-yellow text-L-black
                          rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150"
              onClick={refreshForm}>
              Refresh
            </button>
          </div>
        </form>

          {image.length > 0 && (
            <div className="w-4/6 h-[200px]">
              <div className="flex flex-wrap h-[250%] overflow-auto">
                {image.map((image, index) => (
                  <div key={index} className="w-full sm:w-3/6 md:w-2/6 p-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      className="rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
