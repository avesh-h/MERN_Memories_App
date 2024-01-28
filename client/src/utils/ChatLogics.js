//In Chat there is two users 1.Current logged in user ,2.Other user
export const getSender = (loggedUser, users) => {
  return users?.[0]._id === loggedUser?._id
    ? users?.[1]?.name
    : users?.[0]?.name;
};

export const getSenderObj = (loggedUser, users) => {
  return users?.[0]._id === loggedUser?._id ? users?.[1] : users?.[0];
};
