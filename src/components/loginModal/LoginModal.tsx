import { Box, Button, Modal } from "@mui/material";
import { useMemo, useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";

interface LoginModalProps {
  isMobileDevice: boolean;
}

const LoginModal = (props: LoginModalProps) => {
  const { isMobileDevice } = props;
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = useMemo(() => {
    return {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobileDevice ? "100%" : "400px",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
    };
  }, [isMobileDevice]);

  const openSignup = () => {
    setSignupOpen(true);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const buttonStyle = {
    margin: "4px",
    backgroundColor: "#a5551b",
    marginRight: "20px",
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={buttonStyle}
        color="primary"
        onClick={handleOpen}
      >
        Log In
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {signupOpen ? (
            <Signup closeModal={closeModal} closeSignup={closeSignup} />
          ) : (
            <Login closeModal={closeModal} openSignup={openSignup} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
