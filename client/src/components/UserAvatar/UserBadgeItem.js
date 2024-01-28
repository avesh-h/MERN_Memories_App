import { Box } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={2}
      m={1}
      mb={2}
      fontSize={12}
      sx={{ cursor: "pointer" }}
      onClick={handleFunction}
      color="#fff"
      backgroundColor="#f50057"
      display={"flex"}
      alignItems={"center"}
    >
      {user?.name}
      <Close sx={{ pl: 1 }} />
    </Box>
  );
};

export default UserBadgeItem;
