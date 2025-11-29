import { Routes, Route, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import HomePage from '../pages/HomePage';
import BookingPage from '../pages/BookingPage';

import ConfirmedBooking from './ConfirmedBooking';
import { initializeTimes, updateTimes } from '../utils/times';

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );
  const navigate = useNavigate();

  function submitForm(formData) {
    let isSuccess = true;
    if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
      isSuccess = window.submitAPI(formData);
    } else {
      console.warn('submitAPI is not available on window; assuming success for local development.');
    }

    if (isSuccess) {
      navigate('/confirmed');
    } else {
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;