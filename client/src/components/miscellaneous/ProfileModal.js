import { Box, Button, Modal, Typography } from "@material-ui/core";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const ProfileModal = ({ children, user, setAnchorEl }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  return (
    <div>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <Button onClick={handleOpen}>
          <RemoveRedEyeIcon />
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ textAlign: "center" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontWeight: "700" }}
          >
            {user?.result?.name}
          </Typography>
          <Box>
            <img
              src={user?.result?.imageUrl}
              alt={user?.result?.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {user?.result?.email}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
