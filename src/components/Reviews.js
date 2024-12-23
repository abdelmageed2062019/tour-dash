import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviews,
  toggleReviewVisibility,
  removeReview,
} from "../app/reviews/ReviewsSlice";
import { Trash } from "lucide-react";
import Loading from "./Loading";

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const handleToggleVisibility = async (id) => {
    try {
      await dispatch(toggleReviewVisibility(id)).unwrap(); // Ensure the action is successful
      await dispatch(getReviews());
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(removeReview(id)).unwrap(); // Ensure the action is successful
        await dispatch(getReviews());
      } catch (err) {
        console.error("Failed to delete review:", err);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              User
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Tour
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Rating
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Comment
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Visibility
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {reviews.map((review) => (
            <tr
              key={review._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">
                {review.user && review.user.email ? review.user.email : "N/A"}
              </td>
              <td className="py-3 px-6">
                {review.tour && review.tour.title ? review.tour.title : "N/A"}
              </td>
              <td className="py-3 px-6">{review.rating || "N/A"}</td>
              <td className="py-3 px-6">{review.comment || "N/A"}</td>
              <td className="py-3 px-6">
                <button
                  className={`py-1 px-3 rounded ${
                    review.visible
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => handleToggleVisibility(review._id)}
                >
                  {review.visible ? "Visible" : "Hidden"}
                </button>
              </td>
              <td className="py-3 px-6">
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
