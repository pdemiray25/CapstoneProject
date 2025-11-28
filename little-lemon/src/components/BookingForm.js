import React, { useState, useEffect } from "react";

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [formValid, setFormValid] = useState(false);

  // 🔥 Form validity kontrolü
  useEffect(() => {
    const isValid =
      date !== "" &&
      time !== "" &&
      guests > 0 &&
      guests <= 10 &&
      ["Birthday", "Anniversary"].includes(occasion);
    setFormValid(isValid);
  }, [date, time, guests, occasion]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    dispatch({ type: "UPDATE_TIMES", payload: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return;
    const formData = { date, time, guests, occasion };
    submitForm(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", maxWidth: "250px", gap: "20px" }}
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        <option value="">-- Select --</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        required
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>

      {/* Submit button form geçerli değilse disable */}
      <input
        type="submit"
        value="Make Your Reservation"
        disabled={!formValid}
      />
    </form>
  );
};

export default BookingForm;
