import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";

export interface SaveRouteModalParams {
  handleSaveSubmit: (name: string) => void;
  open: boolean;
  handleClose: () => void;
}

const SaveRouteModal = (params: SaveRouteModalParams) => {
  const { handleSaveSubmit, open, handleClose } = params;
  const [name, setname] = useState("");

  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const buttonStyle = {
    marginTop: "10px",
    width: "100px",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <TextField
          id="name-field"
          label="Route name"
          variant="outlined"
          onChange={(value) => {
            setname(value.target.value);
          }}
          margin="dense"
        />
        <div className="login-window-login-button-row">
          <Button
            variant="outlined"
            onClick={() => {
              handleSaveSubmit(name);
              handleClose();
            }}
            style={buttonStyle}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SaveRouteModal;
