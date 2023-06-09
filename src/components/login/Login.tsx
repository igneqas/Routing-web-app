import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./Login.css";

interface SignupParams {
  closeModal: () => void;
  openSignup: () => void;
}

const Login = (params: SignupParams) => {
  const { closeModal, openSignup } = params;
  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(credentials: any) {
    return fetch("http://localhost:8080/api/v1/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) {
      setEmailInputError(true);
      return;
    }
    setEmailInputError(false);

    if (!password) {
      setPasswordInputError(true);
      return;
    }
    setPasswordInputError(false);

    try {
      const token = await loginUser({
        email,
        password,
      });
      setToken(token!.accessToken);
      closeModal();
      window.location.reload();
    } catch {
      setEmailInputError(true);
      setPasswordInputError(true);
    }
  };

  function setToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  const signupButtonStyle = {
    marginTop: "50px",
    width: "100px",
  };

  const loginButtonStyle = {
    marginTop: "10px",
    width: "100px",
  };

  return (
    <>
      <TextField
        error={emailInputError}
        id="email-field"
        label="Email"
        variant="outlined"
        onChange={(value) => {
          setEmail(value.target.value);
        }}
        margin="dense"
      />
      <TextField
        error={passwordInputError}
        helperText={passwordInputError ? "Wrong login." : undefined}
        id="password-field"
        label="Password"
        variant="outlined"
        onChange={(value) => {
          setPassword(value.target.value);
        }}
        margin="dense"
        type="password"
      />
      <div className="login-window-login-button-row">
        <Button
          variant="outlined"
          onClick={handleLoginSubmit}
          style={loginButtonStyle}
        >
          Log in
        </Button>
      </div>
      <div className="login-window-signup-button-row">
        <Button
          style={signupButtonStyle}
          variant="outlined"
          onClick={openSignup}
        >
          Sign up
        </Button>
      </div>
    </>
  );
};

export default Login;
