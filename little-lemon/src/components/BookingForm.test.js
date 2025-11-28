import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

// Mock dispatch ve submitForm
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

describe("BookingForm component", () => {
  beforeEach(() => {
    render(
      <BookingForm
        availableTimes={["17:00", "18:00", "19:00"]}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );
  });

  test("renders all input fields with correct HTML5 attributes", () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute("required");

    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toHaveAttribute("required");

    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute("required");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute("required");

    const submitButton = screen.getByRole("button", { name: /make your reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test("enables submit button when all fields are valid", () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole("button", { name: /make your reservation/i });

    fireEvent.change(dateInput, { target: { value: "2025-12-31" } });
    fireEvent.change(timeSelect, { target: { value: "17:00" } });
    fireEvent.change(guestsInput, { target: { value: 4 } });
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

    expect(submitButton).not.toBeDisabled();
  });

  test("calls submitForm with correct data when form is submitted", () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole("button", { name: /make your reservation/i });

    fireEvent.change(dateInput, { target: { value: "2025-12-31" } });
    fireEvent.change(timeSelect, { target: { value: "17:00" } });
    fireEvent.change(guestsInput, { target: { value: 4 } });
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

    fireEvent.click(submitButton);

    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: "2025-12-31",
      time: "17:00",
      guests: 4,
      occasion: "Birthday"
    });
  });
});
