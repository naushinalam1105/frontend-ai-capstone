import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import UserSettingsForm from "./UserSettingsForm";

describe("UserSettingsForm", () => {
  test("shows validation error for invalid email", async () => {
    const user = userEvent.setup();

    render(<UserSettingsForm />);

    await user.type(
      screen.getByLabelText(/username/i),
      "johnsmith"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "invalid-email"
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save changes/i,
      })
    );

    expect(
      await screen.findByText(
        /please enter a valid email address/i
      )
    ).toBeInTheDocument();
  });

  test("does not show email validation for valid email", async () => {
    const user = userEvent.setup();

    render(<UserSettingsForm />);

    await user.type(
      screen.getByLabelText(/username/i),
      "johnsmith"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /save changes/i,
      })
    );

    expect(
      screen.queryByText(/please enter a valid email address/i)
    ).not.toBeInTheDocument();
  });
});