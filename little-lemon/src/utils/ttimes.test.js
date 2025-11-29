import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

const renderBookingForm = (overrideProps = {}) => {
  const defaultProps = {
    availableTimes: ['17:00', '18:00'],
    dispatch: jest.fn(),
    submitForm: jest.fn(),
  };

  const props = { ...defaultProps, ...overrideProps };

  render(<BookingForm {...props} />);

  return props;
};

describe('BookingForm – HTML5 validation attributes', () => {
  test('date input has required and min attributes', () => {
    renderBookingForm();

    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toBeRequired();

    const today = new Date().toISOString().split('T')[0];
    expect(dateInput).toHaveAttribute('min', today);
  });

  test('time select is required', () => {
    renderBookingForm();

    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toBeRequired();
  });

  test('guests input is type number with min=1, max=10 and required', () => {
    renderBookingForm();

    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });
});

describe('BookingForm – JavaScript validation & submission', () => {
  test('shows error and disables submit when guests < 1', () => {
    renderBookingForm();

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitButton = screen.getByRole('button', {
      name: /make your reservation/i,
    });

    const today = new Date().toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });

    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);

    expect(
      screen.getByText(/at least 1 guest required/i)
    ).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
  });

  test('shows error when guests > 10', () => {
    renderBookingForm();

    const guestsInput = screen.getByLabelText(/number of guests/i);

    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);

    expect(
      screen.getByText(/maximum 10 guests allowed/i)
    ).toBeInTheDocument();
  });

  test('enables submit and calls submitForm with correct data when form is valid', () => {
    const { submitForm } = renderBookingForm();

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitButton = screen.getByRole('button', {
      name: /make your reservation/i,
    });

    const today = new Date().toISOString().split('T')[0];

    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith({
      date: today,
      time: '17:00',
      guests: 4,
      occasion: 'Birthday',
    });
  });
});
