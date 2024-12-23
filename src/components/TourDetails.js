import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTourAsync } from "../app/tours/toursSlice";

export default function TourDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);
  console.log(tour);

  useEffect(() => {
    dispatch(fetchTourAsync(id));
  }, [dispatch, id]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

      {/* Render all media */}
      {tour.media && tour.media.length > 0 && (
        <div className="mb-4">
          {tour.media.map((mediaItem, index) => {
            if (mediaItem.type === "image") {
              return (
                <img
                  key={index}
                  alt={`tour-media-${index}`}
                  className="w-full h-64 object-cover mb-4"
                  src={mediaItem.url}
                />
              );
            } else if (mediaItem.type === "video") {
              return (
                <video
                  key={index}
                  controls
                  className="w-full h-64 object-cover mb-4"
                  src={mediaItem.url}
                ></video>
              );
            }
            return null;
          })}
        </div>
      )}

      <h2 className="text-xl font-semibold my-2">Description:</h2>
      <p className="text-gray-700 mb-4">{tour.description}</p>

      <h2 className="text-xl font-semibold my-2">City:</h2>
      <p className="text-gray-600">City: {tour.city}</p>

      <h2 className="text-xl font-semibold my-2">Duration:</h2>
      <p className="text-gray-600">Duration: {tour.duration}</p>
    </div>
  );
}
