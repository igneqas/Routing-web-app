import { render, fireEvent, act } from "@testing-library/react";
import Login from "./Login";
import "@testing-library/jest-dom";

describe("Login", () => {
  test("renders email and password fields", () => {
    const { getByLabelText } = render(
      <Login closeModal={() => {}} openSignup={() => {}} />
    );
    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test("displays error when email or password is not entered", () => {
    const { getByLabelText, getByText } = render(
      <Login closeModal={() => {}} openSignup={() => {}} />
    );
    const emailField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    const loginButton = getByText("Log in");

    act(() => {
      fireEvent.click(loginButton);
    });
    expect(emailField.parentElement).toHaveClass("Mui-error");
    expect(passwordField.parentElement).not.toHaveClass("Mui-error");

    act(() => {
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.click(loginButton);
    });
    expect(emailField.parentElement).not.toHaveClass("Mui-error");
    expect(passwordField.parentElement).toHaveClass("Mui-error");

    act(() => {
      fireEvent.change(passwordField, { target: { value: "password123" } });
      fireEvent.click(loginButton);
    });
    expect(emailField.parentElement).not.toHaveClass("Mui-error");
    expect(passwordField.parentElement).not.toHaveClass("Mui-error");
  });

  //   test("calls closeModal on successful login", async () => {
  //     const mockLoginUser = jest.fn(() =>
  //       Promise.resolve({ accessToken: "testToken" })
  //     );
  //     const mockCloseModal = jest.fn();
  //     const { getByLabelText } = render(
  //       <Login closeModal={mockCloseModal} openSignup={() => {}} />
  //     );
  //     const emailField = getByLabelText("Email");

  //     fireEvent.change(emailField, { target: { value: "test@example.com" } });
  //     expect(mockCloseModal).toHaveBeenCalled();
  //   });
});
