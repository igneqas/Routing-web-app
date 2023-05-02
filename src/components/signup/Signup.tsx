import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./Signup.css";
import { setToken } from "../../utils/TokenHandler";

interface SignupParams {
  closeModal: () => void;
  closeSignup: () => void;
}

const Signup = (params: SignupParams) => {
  const { closeModal, closeSignup } = params;
  const [inputError, setInputError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(credentials: any) {
    return fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleSignupSubmit = async (e: any) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setInputError(true);
      return;
    }
    setInputError(false);
    try {
      const token = await registerUser({
        username,
        email,
        password,
      });
      setToken(token!.accessToken);
      closeModal();
      window.location.reload();
    } catch {
      setInputError(true);
    }
  };

  const loginButtonStyle = {
    marginTop: "50px",
    width: "100px",
  };

  const signupButtonStyle = {
    marginTop: "10px",
    width: "100px",
  };

  return (
    <>
      <TextField
        error={inputError}
        id="username-field"
        label="Username"
        variant="outlined"
        onChange={(value) => {
          setUsername(value.target.value);
        }}
        margin="dense"
      />
      <TextField
        error={inputError}
        id="email-field"
        label="Email"
        variant="outlined"
        onChange={(value) => {
          setEmail(value.target.value);
        }}
        margin="dense"
      />
      <TextField
        error={inputError}
        helperText={inputError ? "Fields cannot be empty." : undefined}
        id="password-field"
        label="Password"
        variant="outlined"
        onChange={(value) => {
          setPassword(value.target.value);
        }}
        margin="dense"
      />
      <div className="signup-button-row">
        <Button
          style={signupButtonStyle}
          variant="outlined"
          onClick={handleSignupSubmit}
        >
          Sign up
        </Button>
      </div>
      <div className="login-button-row">
        <Button
          variant="outlined"
          onClick={closeSignup}
          style={loginButtonStyle}
        >
          Log in
        </Button>
      </div>
    </>
  );
};

export default Signup;
