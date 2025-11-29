import { useState } from 'react';

const todayString = new Date().toISOString().split('T')[0];

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
  });

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateGuests = (value) => {
    const n = Number(value);
    if (!value && value !== 0) return 'Please enter number of guests';
    if (Number.isNaN(n)) return 'Guests must be a number';
    if (n < 1) return 'At least 1 guest required';
    if (n > 10) return 'Maximum 10 guests allowed';
    return '';
  };

  const dateError = !date ? 'Please choose a date' : '';
  const timeError = !time ? 'Please choose a time' : '';
  const guestsError = validateGuests(guests);

  const isFormValid = !dateError && !timeError && !guestsError;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched({ date: true, time: true, guests: true });
      return;
    }

    const formData = { date, time, guests: Number(guests), occasion };
    submitForm(formData);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    dispatch({ type: 'SET_DATE', date: newDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="booking-form"
      style={{ display: 'grid', maxWidth: '300px', gap: '12px' }}
      noValidate
    >
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        onBlur={() => markTouched('date')}
        required
        min={todayString}
      />
      {touched.date && dateError && <span>{dateError}</span>}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onBlur={() => markTouched('time')}
        required
      >
        <option value="" disabled>Select time</option>
        {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      {touched.time && timeError && <span>{timeError}</span>}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        onBlur={() => markTouched('guests')}
        required
      />
      {touched.guests && guestsError && <span>{guestsError}</span>}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input
        type="submit"
        value="Make Your reservation"
        aria-label="On Click"
        disabled={!isFormValid}
        style={{
          opacity: isFormValid ? 1 : 0.6,
          cursor: isFormValid ? 'pointer' : 'not-allowed',
        }}
      />
    </form>
  );
}

export default BookingForm;
