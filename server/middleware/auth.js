import jwt from "jsonwebtoken";

//This middleware function is use for check user has valid token or not and this middleware apply on both custom token and also google token

//if token length is less than 500 then it means it custom generated token and if length is more than 500 then it's google token

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodeData;
    //For custom token
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");

      //we have to see id from the decodeData and save in another variable because we don't know which user is like the post or delete the post etc.

      req.userId = decodeData?.id;
    }
    //for google token
    else {
      decodeData = jwt.decode(token);

      //sub is for google which is differentiate each individual user from others
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

//SO when this code is going to be executed so when user is liking the post or delete the post then for that is going to be api call for that so at that time first it will check that user is authorised or not with this above auth() function.

// middleware function can access our req or res object before call the api that's why it's called middleware.
