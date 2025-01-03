import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTourAsync, updateTourAsync } from "../app/tours/toursSlice";
import Loading from "./Loading";

const UpdateTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    availability: "Available",
    pickUpAndDropOff: "", // New field
    details: "", // New field
    fullDay: "", // New field
    viewPrice: "", // New field
    note: "", // New field
    languages: [],
    city: "",
    media: null, // Array of media objects
    prices: {
      privateTourWithLunch: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateTourWithoutLunch: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateTourGuide: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateCarWithDriver: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await dispatch(fetchTourAsync(id));
        if (response.payload) {
          setFormData({
            ...response.payload,
            media: response.payload.media || null,
          });
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchTour();
  }, [id, dispatch]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (e, category, subCategory) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [category]: {
          ...prev.prices[category],
          [subCategory]: Number(value),
        },
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file only
    setFormData((prev) => ({
      ...prev,
      media: file, // Set the single file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append the single image file
    if (formData.media) {
      data.append("media", formData.media);
    }

    // Append other fields
    for (const key in formData) {
      if (key !== "media") {
        if (typeof formData[key] === "object") {
          data.append(key, JSON.stringify(formData[key])); // Convert objects/arrays to JSON
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await dispatch(updateTourAsync({ id, tour: data }));
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/tours");
      } else {
        console.error("Failed to update the tour");
      }
    } catch (error) {
      console.error("Error updating the tour:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">Update Tour</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Pick Up and Drop Off */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pick Up and Drop Off
            </label>
            <input
              type="text"
              name="pickUpAndDropOff"
              value={formData.pickUpAndDropOff}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Full Day */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Day
            </label>
            <input
              type="text"
              name="fullDay"
              value={formData.fullDay}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* View Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              View Price
            </label>
            <input
              type="text"
              name="viewPrice"
              value={formData.viewPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          {/* Media Upload */}
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*" // Restrict to images
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
        {/* Price Inputs */}
        <div>
          <label className="block text-lg font-medium mb-2">Prices</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.prices).map((category) =>
              Object.keys(formData.prices[category]).map((subCategory) => (
                <div key={`${category}-${subCategory}`}>
                  <label className="block text-sm font-medium text-gray-700">
                    {`${category.replace(
                      /([A-Z])/g,
                      " $1"
                    )} - ${subCategory.replace(/([A-Z])/g, " $1")}`}
                  </label>
                  <input
                    type="number"
                    value={formData.prices[category][subCategory]}
                    onChange={(e) =>
                      handleNestedInputChange(e, category, subCategory)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/tours")}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Update Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTour;
