import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

const AddBanner = ({ getBanners, setOpenForm }) => {
  const [formData, setFormData] = useState({
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData({ images: [...formData.images, ...files] });
    setImagePreviews(
      [...formData.images, ...files].map((file) => {
        if (typeof file === "string") {
          return file;
        } else {
          return URL.createObjectURL(file);
        }
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formData.images.forEach((image) =>
        formDataToSend.append("images", image)
      );

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/banner/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        getBanners();
        setOpenForm(false);
      }
    } catch (error) {
      console.error(error);
      toast.success(response.error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 bg-white/80 shadow-md p-4 flex items-center justify-center">
      <div className="p-5 rounded-md shadow-lg bg-white min-w-lg">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add New Banner</h1>
          <button
            onClick={() => setOpenForm(false)}
            className=" p-2 cursor-pointer text-white rounded-full"
          >
            <IoMdClose size={24} className="text-black" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="images"
            className="border border-gray-300 rounded-md p-2 cursor-pointer"
          >
            Choose Files
          </label>
          <input
            id="images"
            required
            multiple
            name="images"
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-md p-2 hidden"
          />
          <div className="flex gap-2">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-32 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      images: formData.images.filter((_, i) => i !== index),
                    });
                    setImagePreviews(
                      imagePreviews.filter((_, i) => i !== index)
                    );
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <MdOutlineDelete size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={!imagePreviews.length}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <LuLoaderCircle size={20} className="mx-auto animate-spin" />
            ) : (
              "Add Banner"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const HomeBanners = () => {
  const [banners, setBanners] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const getBanners = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/banner/get`
      );
      const data = response.data;
      if (data.success) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/banner/delete/${id}`
      );
      const data = response.data;

      if (data.success) {
        getBanners();
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);
  return (
    <div className="w-full">
      <div className="flex w-full items-end justify-between mb-4">
        <h1 className="text-2xl font-bold">Home Banners</h1>
        <button
          onClick={() => setOpenForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New Banner
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {banners.map((banner, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
            }}
            className=" rounded-md shadow-md overflow-hidden relative"
          >
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
              }}
              className=" flex items-center justify-between p-4 text-white"
            >
              <h2 className="text-xl font-semibold">Banner {index + 1} </h2>
              <button
                onClick={() => deleteBanner(banner._id)}
                className="p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
              >
                <MdDeleteOutline size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {openForm && (
        <AddBanner getBanners={getBanners} setOpenForm={setOpenForm} />
      )}
    </div>
  );
};

export default HomeBanners;
