import { setToken, getToken, signOut } from "../TokenHandler";

describe("setToken", () => {
  it("should set the token in sessionStorage", () => {
    const token = "testToken";
    setToken(token);
    expect(sessionStorage.getItem("token")).toEqual(token);
  });
});

describe("getToken", () => {
  it("should retrieve the token from sessionStorage", () => {
    const token = "testToken";
    sessionStorage.setItem("token", token);
    expect(getToken()).toEqual(token);
  });

  it("should return null if token is not set in sessionStorage", () => {
    sessionStorage.removeItem("token");
    expect(getToken()).toBeNull();
  });
});

describe("signOut", () => {
  it("should clear the token and reload the window", () => {
    sessionStorage.setItem("token", "testToken");

    signOut();
  });
});
