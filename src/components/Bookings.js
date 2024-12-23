import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, Pencil, Trash2, Download } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPaginatedBookingsAsync,
  updateBookingAsync,
  deleteBookingAsync,
  downloadMonthlyBookingsAsync,
} from "../app/bookings/bookingSlice";
import { fetchToursAsync } from "../app/tours/toursSlice";
import Loading from "./Loading";

export default function Bookings() {
  const dispatch = useDispatch();
  const { bookings, loading, error, pagination } = useSelector(
    (state) => state.bookings
  );
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { pages } = pagination;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formError, setFormError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [operationLoading, setOperationLoading] = useState(false);

  const [limit] = useState(10);

  useEffect(() => {
    dispatch(fetchToursAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPaginatedBookingsAsync({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setOperationLoading(true);
      try {
        await dispatch(deleteBookingAsync(id)).unwrap();
      } catch (error) {
        alert(`Error deleting booking: ${error}`);
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingData = {
      time: formData.get("time"),
      cellPhone: formData.get("cellPhone"),
      status: formData.get("status"),
    };

    setOperationLoading(true);
    try {
      await dispatch(
        updateBookingAsync({
          id: editingBooking._id,
          bookingData,
        })
      ).unwrap();
      setIsModalOpen(false);
      setEditingBooking(null);
      dispatch(fetchPaginatedBookingsAsync({ page: currentPage, limit }));
    } catch (err) {
      setFormError(err);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDownloadMonthlyCSV = async () => {
    if (!selectedMonth || !selectedYear) {
      alert("Please select a year and month.");
      return;
    }

    setOperationLoading(true);
    try {
      await dispatch(
        downloadMonthlyBookingsAsync({
          year: selectedYear,
          month: selectedMonth,
        })
      ).unwrap();
      alert("Download started successfully!");
    } catch (error) {
      alert(`Failed to download bookings: ${error}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings Management</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-md"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-3"
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <button
            onClick={handleDownloadMonthlyCSV}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Monthly CSV
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <p className="text-red-500">Error: {error}</p>}
          {formError && <p className="text-red-500">Error: {formError}</p>}
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {booking.tourName}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>User: {booking.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>Contact: {booking.cellPhone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-600 font-semibold">
                          Amount: ${booking.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {operationLoading && (
        <div className="text-center text-gray-500 mt-4">
          Processing your request...
        </div>
      )}

      {renderPagination()}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    defaultValue={editingBooking?.time}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="cellPhone"
                    defaultValue={editingBooking?.cellPhone}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingBooking?.status}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "approved":
      return "bg-emerald-100 text-emerald-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
