import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./Signup.css";
import { setToken } from "../../utils/TokenHandler";

interface SignupParams {
  closeModal: () => void;
  closeSignup: () => void;
}

interface InputError {
  isError: boolean;
  message?: string;
}

const Signup = (params: SignupParams) => {
  const { closeModal, closeSignup } = params;
  const [usernameInputError, setUsernameInputError] = useState<InputError>({
    isError: false,
  });
  const [emailInputError, setEmailInputError] = useState<InputError>({
    isError: false,
  });
  const [passwordInputError, setPasswordInputError] = useState<InputError>({
    isError: false,
  });
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
    });
  }

  const validateUsername = () => {
    if (!username) {
      setUsernameInputError({
        isError: true,
        message: "Field cannot be empty",
      });
      return false;
    }
    if (username.length < 3) {
      setUsernameInputError({
        isError: true,
        message: "Username should be at least 3 characters",
      });
      return false;
    }
    if (username.length > 20) {
      setUsernameInputError({
        isError: true,
        message: "Username should be at most 20 characters",
      });
      return false;
    }

    setUsernameInputError({ isError: false });
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailInputError({
        isError: true,
        message: "Field cannot be empty",
      });
      return;
    }
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if (!regexExp.test(email)) {
      setEmailInputError({
        isError: true,
        message: "Wrong email format",
      });
      return;
    }

    setEmailInputError({ isError: false });
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordInputError({
        isError: true,
        message: "Field cannot be empty",
      });
      return;
    }
    if (password.length < 5) {
      setPasswordInputError({
        isError: true,
        message: "Password should be at least 5 characters",
      });
      return false;
    }
    if (password.length > 30) {
      setPasswordInputError({
        isError: true,
        message: "Password should be at most 30 characters",
      });
      return false;
    }
    if (!password.match(/[a-zA-Z]/g) || !password.match(/[0-9]/g)) {
      setPasswordInputError({
        isError: true,
        message: "Password should have at least one letter and one digit",
      });
      return false;
    }

    setPasswordInputError({ isError: false });
    return true;
  };

  const handleSignupSubmit = async (e: any) => {
    e.preventDefault();

    const usernameIsValid = validateUsername();
    const emailIsValid = validateEmail();
    const passwordIsValid = validatePassword();

    if (!usernameIsValid || !emailIsValid || !passwordIsValid) return;

    try {
      const response = await registerUser({
        username,
        email,
        password,
      });
      if (response.status === 409) {
        setEmailInputError({
          isError: true,
          message: "Email already registered",
        });
        return;
      }

      const token = await response.json();
      setToken(token!.accessToken);
      closeModal();
      window.location.reload();
    } catch {
      setUsernameInputError({ isError: true });
      setEmailInputError({ isError: true });
      setPasswordInputError({ isError: true });
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
        error={usernameInputError.isError}
        helperText={
          usernameInputError.isError ? usernameInputError.message : undefined
        }
        id="username-field"
        label="Username"
        variant="outlined"
        onChange={(value) => {
          setUsername(value.target.value);
        }}
        margin="dense"
      />
      <TextField
        error={emailInputError.isError}
        helperText={
          emailInputError.isError ? emailInputError.message : undefined
        }
        id="email-field"
        label="Email"
        variant="outlined"
        onChange={(value) => {
          setEmail(value.target.value);
        }}
        margin="dense"
      />
      <TextField
        error={passwordInputError.isError}
        helperText={
          passwordInputError.isError ? passwordInputError.message : undefined
        }
        id="password-field"
        label="Password"
        variant="outlined"
        onChange={(value) => {
          setPassword(value.target.value);
        }}
        margin="dense"
        type="password"
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
