import { render, fireEvent } from "@testing-library/react";
import LoginModal from "./LoginModal";
import "@testing-library/jest-dom";

describe("LoginModal", () => {
  test("renders the 'Log In' button", () => {
    const { getByText } = render(<LoginModal isMobileDevice={false} />);
    const loginButton = getByText("Log In");
    expect(loginButton).toBeInTheDocument();
  });
});
