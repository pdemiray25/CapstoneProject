import BookingForm from '../components/BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="booking-page">
      <h1>Reserve a table</h1>
      <p>
        Please choose a date, time, number of guests and occasion to make your
        reservation.
      </p>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;