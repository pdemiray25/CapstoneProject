/* global fetchAPI, submitAPI */
import React, { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";

// STEP 2 — Başlangıç için bugünün tarihini al
const today = new Date().toISOString().split("T")[0];

// STEP 2 — Initial available times (API’den al)
const initializeTimes = () => {
  return fetchAPI(today);
};

// STEP 2 — Update times based on selected date (API’den al)
const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(action.payload);
  }
  return state;
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // STEP 3 — Form submit fonksiyonu
  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmed"); // rezervasyon başarılıysa confirmation page’e yönlendir
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm} // BookingForm'a prop olarak iletiliyor
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
};

export default Main;
export { initializeTimes, updateTimes };
