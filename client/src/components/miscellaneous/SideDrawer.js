import { Box, Tooltip } from "@material-ui/core";
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <>
      <Box>
        {/* <Tooltip title="Search User to chat" placement="bottom-end"></Tooltip> */}
      </Box>
    </>
  );
};

export default SideDrawer;
