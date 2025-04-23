import { useRef, useState } from "react";
import { Upload } from 'lucide-react';
import { dotPulse } from "ldrs";
import Masonry from "react-masonry-css";

import { Progress } from "@/components/ui/progress"
import { handleUploadData } from "@/services/productServices";
import useUserStore from "@/zustand_store/userStore";

dotPulse.register();

export const CarOwner = () => {
  const [image, setImage] = useState([]);
  const [carName, setCarName] = useState("");
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [selectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { user } = useUserStore();
  const username = user.name;

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImage([...image, ...Array.from(selectedImages)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleUploadData({
      setUploadProgress,
      setIsLoading,
      refreshForm,
      username,
      carName,
      price,
      rent,
      image
    })
  }

  const isFormValid = () => {
    return image == [] || carName === ""
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

    const breakpointColumnsObj = {
      default: 3,
      768: 2,
      480: 1,
    };

  return (
    <>
      <div className="bg-white w-full py-10 px-8 md:px-16">
        <h1 className="font-bold text-4xl pb-8">
          Put your car <span className="underline-rounded">for sell</span>
        </h1>
        <div className="flex gap-2 flex-col sm:flex-row">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow p-4 mt-2 w-full sm:w-4/6 md:w-2/6 bg-L-black text-white flex flex-col gap-2">
            <div className="relative flex flex-col justify-center items-center">
              <h1 className="text-center uppercase font-bold pb-2 text-2xl">
                {username}
              </h1>
              {isLoading && (
                <Progress value={uploadProgress} className="transition-all duration-300" />
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="fileInput"
                className="flex items-center justify-between">
                Upload Image
                <span className="bg-white text-L-black py-2 cursor-pointer font-bold w-4/6 flex justify-center rounded-full
                             hover:!bg-yellow transition ease-in-out active:scale-95 hover:scale-105 duration-150">
                  {selectedFile ? selectedFile.name : <Upload />}
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

            <input
              type="text"
              value={carName}
              placeholder="Car title"
              className="text-L-black rounded-full p-2"
              onChange={(e) => setCarName(e.target.value)}
            />

            <input
              type="number"
              value={price}
              placeholder="Full price"
              className="text-L-black rounded-full p-2"
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              value={rent}
              placeholder="Rent price"
              className="text-L-black rounded-full p-2"
              onChange={(e) => setRent(e.target.value)}
            />

            <p className="text-sm">
              <span className="text-yellow font-bold text-base">Note: </span>
              Please refresh form if any mistake were made!!
            </p>
            <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="py-2 px-2 w-full sm:w-2/4 mt-2 bg-yellow text-L-black hover:bg-yellow hover:text-L-black
              rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150 btn"
              disabled={isFormValid()}
              onClick={handleSubmit}>
                {isLoading ? <l-dot-pulse size="43" speed="1.3" color="#111119" ></l-dot-pulse> : "Submit"}
            </button>
            <button
              type="button"
              className="py-2 px-2 w-full sm:w-2/4 mt-2 bg-yellow text-L-black
                          rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150"
              onClick={refreshForm}>
              Refresh
            </button>
          </div>
        </form>
          {image.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-2 w-full md:w-4/6 h-[400px] overflow-auto removeScroll"
            columnClassName="masonry-column">
            {image.map((image, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index}`}
                  className="rounded-2xl w-full h-auto object-cover mt-2"
                />
              </div>
            ))}
          </Masonry>
          ) :
          <>
          <div className="flex items-center justify-center w-[65%]">
            <div className="flex flex-col w-full text-L-black p-4">
              <p className="text-2xl font-bold text-center">
                UPLOAD IMAGE
              </p>
            </div>
          </div>
          </>}
        </div>
      </div>
    </>
  );
};
