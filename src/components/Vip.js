import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVIP, getVIP } from "../app/vip/vipSlice";
import { motion } from "framer-motion";

export default function VIPDetails() {
  const dispatch = useDispatch();
  const { vipTour, isLoading, error } = useSelector((state) => state.vip);

  console.log("VIP Tour Data:", vipTour);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    pickUpAndDropOff: "",
    details: "",
    fullDay: "",
    note: "",
    description: "",
    type: "",
    availability: "",
    price: "",
    city: "",
    media: null,
  });

  useEffect(() => {
    dispatch(getVIP());
  }, [dispatch]);

  useEffect(() => {
    if (vipTour) {
      setFormData({
        title: vipTour.title || "",
        duration: vipTour.duration || "",
        pickUpAndDropOff: vipTour.pickUpAndDropOff || "",
        details: vipTour.details || "",
        fullDay: vipTour.fullDay || "",
        note: vipTour.note || "",
        description: vipTour.description || "",
        type: vipTour.type || "",
        availability: vipTour.availability || "",
        price: vipTour.price || "",
        city: vipTour.city || "",
        media: vipTour.media || null,
      });
    }
  }, [vipTour]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      media: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Before Submission:", formData);

    const updatedData = new FormData();

    for (const key in formData) {
      if (key === "media" && formData.media) {
        updatedData.append("media", formData.media); // Append single image
      } else {
        updatedData.append(key, formData[key]);
      }
    }

    for (let pair of updatedData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    dispatch(updateVIP(updatedData));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-60 w-full mb-4 rounded-lg"></div>
          <div className="bg-gray-300 h-6 w-1/3"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">VIP Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Title</h2>
              <p>{vipTour.title || "N/A"}</p>
            </div>

            {/* Duration */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Duration</h2>
              <p>{vipTour.duration || "N/A"}</p>
            </div>

            {/* Pick Up and Drop Off */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Pick Up and Drop Off</h2>
              <p>{vipTour.pickUpAndDropOff || "N/A"}</p>
            </div>

            {/* Details */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Details</h2>
              <p>{vipTour.details || "N/A"}</p>
            </div>

            {/* Full Day */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Full Day</h2>
              <p>{vipTour.fullDay || "N/A"}</p>
            </div>

            {/* Note */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Note</h2>
              <p>{vipTour.note || "N/A"}</p>
            </div>

            {/* Description */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Description</h2>
              <p>{vipTour.description || "N/A"}</p>
            </div>

            {/* Type */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Type</h2>
              <p>{vipTour.type || "N/A"}</p>
            </div>

            {/* Availability */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Availability</h2>
              <p>{vipTour.availability || "N/A"}</p>
            </div>

            {/* Price */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Price</h2>
              <p>${vipTour.price || "N/A"}</p>
            </div>

            {/* City */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">City</h2>
              <p>{vipTour.city || "N/A"}</p>
            </div>

            {/* Media */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Media</h2>
              {vipTour.media ? (
                vipTour.media.type.startsWith("image") ? (
                  <img
                    src={vipTour.media.url}
                    alt="Media"
                    className="w-full h-auto rounded-md"
                  />
                ) : vipTour.media.type.startsWith("video") ? (
                  <video
                    src={vipTour.media.url}
                    controls
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-500">
                    Unsupported media type
                  </p>
                )
              ) : (
                <p>No media available</p>
              )}
            </div>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
        </div>
      )}

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full relative overflow-auto max-h-screen"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update VIP Details
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {Object.keys(formData).map((field) =>
                field !== "newMedia" && field !== "media" ? (
                  <div key={field} className="col-span-full">
                    <label className="block text-sm font-medium capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    {field === "details" ||
                    field === "description" ||
                    field === "note" ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition duration-200"
                        rows="3"
                      />
                    ) : (
                      <input
                        type={field === "price" ? "number" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition duration-200"
                      />
                    )}
                  </div>
                ) : null
              )}
              <div className="col-span-full">
                <label className="block text-sm font-medium">
                  Upload Media
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
              </div>
              <div className="col-span-full flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
