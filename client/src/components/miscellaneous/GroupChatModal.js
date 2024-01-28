import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { FormControl, TextField } from "@mui/material";
import { addGroupMember, searchUser } from "../../api";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState();
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await searchUser(query);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Occured!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast.error("User already added!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
    setSearchResult([]);
    setSearch("");
  };

  //Creat group chat
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUser?.length) {
      toast.error("Please field all the field!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const { data } = await addGroupMember({
        name: groupChatName,
        users: JSON.stringify(selectedUser?.map((u) => u._id)),
      });
      setChats([data, ...chats]);
      handleClose();
      toast.success("New group chat created!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to create group!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Open
  const handleOpen = () => setOpen(true);

  //Close
  const handleClose = () => setOpen(false);

  const handleRemoveUser = (user) => {
    setSelectedUser((prev) => prev.filter((u) => u._id !== user._id));
  };
  return (
    <>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Create Group Chat
          </Typography>
          <Box>
            <FormControl fullWidth>
              <TextField
                type="text"
                placeholder="Chat Name"
                sx={{ mb: 3 }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <TextField
                type="text"
                placeholder="Add Users eg: John,Jane"
                sx={{ mb: 1 }}
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
              />
            </FormControl>
            {/* selected user */}
            <Box width="100%" display={"flex"} flexWrap={"wrap"}>
              {selectedUser.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemoveUser(u)}
                />
              ))}
            </Box>
            {/* render searched user */}
            {loading ? (
              <div>loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                ?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </Box>
          <Box>
            <Button onClick={handleSubmit}>Create Chat</Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default GroupChatModal;
