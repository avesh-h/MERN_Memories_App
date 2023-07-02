import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div>
      <Box
        onClick={handleFunction}
        sx={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 2,
          mb: 2,
          borderRadius: "15px",
          bgcolor: "#E8E8E8",
          "&:hover": {
            bgcolor: "#3f51b5",
            color: "white",
          },
          cursor: "pointer",
        }}
      >
        <Avatar
          sx={{ marginRight: 2, cursor: "pointer" }}
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Typography>{user.name}</Typography>
          <Typography>
            <b>Email : </b>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default UserListItem;
