import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

//env configuration
dotenv.config();

//Global variable
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

//Create our Oauth2 client here
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//Set creadential for the oAuth2Client that we just created
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Our main function for sendMail
export const sendMail = async ({ email, message, verificationLink = "" }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    //Create the transport for send mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "aveshhasanfatta1155+memories.support@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });
    //Details of the mail
    const mailOptions = {
      from: "MEMORIES APP SUPPORT TEAM <aveshhasanfatta1155+memories.support@gmail.com>", //Sender
      to: email,
      subject: "Email Verification",
      text: message,
      ...(!!verificationLink && {
        html: `<h1>Verification Link : ${verificationLink}</h1>`,
      }),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
