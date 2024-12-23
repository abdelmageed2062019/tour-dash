import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Tours from "./components/Tours";
import Bookings from "./components/Bookings";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AddTour from "./components/AddTour";
import UpdateTour from "./components/UpdateTour";
import TourDetail from "./components/TourDetails";
import VIPDetails from "./components/Vip";
import NileDetails from "./components/Nile";

import "./App.css";
import Reviews from "./components/Reviews";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Private routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/tours" element={<Tours />} />
                      <Route path="/tours/:id" element={<TourDetail />} />
                      <Route path="/reviews" element={<Reviews />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/add-tour" element={<AddTour />} />
                      <Route path="/vip" element={<VIPDetails />} />
                      <Route path="/nile" element={<NileDetails />} />

                      <Route path="/update-tour/:id" element={<UpdateTour />} />
                      <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
