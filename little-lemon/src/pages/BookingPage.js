import BookingForm from "../components/BookingForm";

const BookingPage = ({ availableTimes, dispatch }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Book a Table</h1>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
};

export default BookingPage;
