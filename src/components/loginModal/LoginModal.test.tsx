import { render, fireEvent } from "@testing-library/react";
import LoginModal from "./LoginModal";
import "@testing-library/jest-dom";

describe("LoginModal", () => {
  test("renders the 'Log In' button", () => {
    const { getByText } = render(<LoginModal isMobileDevice={false} />);
    const loginButton = getByText("Log In");
    expect(loginButton).toBeInTheDocument();
  });

  //   test("opens the modal on button click", () => {
  //     const { getByText, getByRole } = render(
  //       <LoginModal isMobileDevice={true} />
  //     );
  //     const loginButton = getByText("Log In");
  //     fireEvent.click(loginButton);
  //     const modal = getByRole("dialog");
  //     expect(modal).toBeInTheDocument();
  //   });

  //   test("closes the modal on close button click", () => {
  //     const { getByText, getByRole, queryByRole } = render(
  //       <LoginModal isMobileDevice={true} />
  //     );
  //     const loginButton = getByText("Log In");
  //     fireEvent.click(loginButton);
  //     const closeButton = getByText("Close");
  //     fireEvent.click(closeButton);
  //     const modal = queryByRole("dialog");
  //     expect(modal).toBeNull();
  //   });

  //   test("renders the Login component when signupOpen is false", () => {
  //     const { getByText } = render(<LoginModal isMobileDevice={true} />);
  //     const loginButton = getByText("Log In");
  //     fireEvent.click(loginButton);
  //     const loginComponent = getByText("Login component");
  //     expect(loginComponent).toBeInTheDocument();
  //   });

  //   test("renders the Signup component when signupOpen is true", () => {
  //     const { getByText } = render(<LoginModal isMobileDevice={true} />);
  //     const loginButton = getByText("Log In");
  //     fireEvent.click(loginButton);
  //     const switchToSignupButton = getByText("Switch to Signup");
  //     fireEvent.click(switchToSignupButton);
  //     const signupComponent = getByText("Signup component");
  //     expect(signupComponent).toBeInTheDocument();
  //   });
});
