import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTourAsync } from "../app/tours/toursSlice";

export default function TourDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const tour = useSelector((state) => state.tours.tour);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      await dispatch(fetchTourAsync(id));
      setLoading(false);
    };
    fetchTour();
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="text-center text-gray-500">Tour data not found.</div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {tour.title || "No Title Available"}
      </h1>

      {/* Media */}
      <div className="mb-6">
        {tour.media?.url ? (
          <img
            alt={`tour-media-${tour._id}`}
            className="w-full h-64 object-cover rounded-lg"
            src={tour.media.url}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Media Available</span>
          </div>
        )}
      </div>

      {/* Description */}
      <h2 className="text-xl font-semibold mb-2">Description:</h2>
      <p className="text-gray-700 mb-4">
        {tour.description || "No Description Available"}
      </p>

      {/* City */}
      <h2 className="text-xl font-semibold mb-2">City:</h2>
      <p className="text-gray-600 mb-4">{tour.city || "No City Information"}</p>

      {/* Duration */}
      <h2 className="text-xl font-semibold mb-2">Duration:</h2>
      <p className="text-gray-600 mb-4">
        {tour.duration || "No Duration Information"}
      </p>

      {/* Price */}
      <h2 className="text-xl font-semibold mb-2">Price:</h2>
      <p className="text-gray-600 mb-4">
        {tour.price ? `$${tour.price}` : "No Price Information"}
      </p>

      {/* Availability */}
      <h2 className="text-xl font-semibold mb-2">Availability:</h2>
      <p className="text-gray-600">
        {tour.availability || "No Availability Information"}
      </p>
    </div>
  );
}
