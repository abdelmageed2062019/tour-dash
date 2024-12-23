import { useEffect } from "react";
import { Users, Map, TrendingUp, DollarSign } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync } from "../app/users/userSlice";
import { fetchToursAsync } from "../app/tours/toursSlice";
import { fetchPaginatedBookingsAsync } from "../app/bookings/bookingSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const { tours } = useSelector((state) => state.tours);
  const { pagination, bookings } = useSelector((state) => state.bookings);
  console.log(tours);

  useEffect(() => {
    dispatch(fetchUsersAsync());
    dispatch(fetchToursAsync());
    dispatch(fetchPaginatedBookingsAsync({ page: 1, limit: 3 }));
  }, [dispatch]);

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: users.length,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      icon: Map,
      label: "Active Tours",
      value: tours.length,
      change: "+5%",
      color: "bg-emerald-500",
    },
    {
      icon: TrendingUp,
      label: "Bookings",
      value: pagination.total,
      change: "+18%",
      color: "bg-purple-500",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: `$${pagination.totalAmount}`,
      change: "+22%",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.change.startsWith("+")
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {tours.slice(0, 3).map((tour, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <video controls className="w-12 h-12 rounded-lg object-cover">
                  <source src={tour.media[0].url || ""} type="video/mp4" />
                </video>
                <div className="flex-1">
                  <h4 className="font-medium">{tour?.title}</h4>
                  <p className="text-sm text-gray-500">{tour.type}</p>
                </div>
                <span className="text-emerald-600 font-medium">
                  ${tour.viewPrice}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.map((book, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{book.tourName}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">{book.user.email}</span>
                  </div>
                </div>
                <span className="text-emerald-600 font-medium">
                  ${book.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
