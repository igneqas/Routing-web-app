import { render, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import "@testing-library/jest-dom";

describe("Signup", () => {
  test("renders username, email, and password fields", () => {
    const { getByLabelText } = render(
      <Signup closeModal={() => {}} closeSignup={() => {}} />
    );
    const usernameField = getByLabelText("Username");
    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    expect(usernameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test("displays error messages for invalid username, email, or password", () => {
    const { getByLabelText, getByText } = render(
      <Signup closeModal={() => {}} closeSignup={() => {}} />
    );
    const usernameField = getByLabelText("Username");
    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    const signupButton = getByText("Sign up");

    fireEvent.click(signupButton);
    expect(usernameField.parentElement).toHaveClass("Mui-error");
    expect(emailField.parentElement).toHaveClass("Mui-error");
    expect(passwordField.parentElement).toHaveClass("Mui-error");

    fireEvent.change(usernameField, { target: { value: "us" } });
    fireEvent.change(emailField, { target: { value: "test" } });
    fireEvent.change(passwordField, { target: { value: "pass" } });
    fireEvent.click(signupButton);

    expect(usernameField.parentElement).toHaveClass("Mui-error");
    expect(emailField.parentElement).toHaveClass("Mui-error");
    expect(passwordField.parentElement).toHaveClass("Mui-error");

    fireEvent.change(usernameField, { target: { value: "username" } });
    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.change(passwordField, { target: { value: "password123" } });
    fireEvent.click(signupButton);

    expect(usernameField.parentElement).not.toHaveClass("Mui-error");
    expect(emailField.parentElement).not.toHaveClass("Mui-error");
    expect(passwordField.parentElement).not.toHaveClass("Mui-error");
  });
});
