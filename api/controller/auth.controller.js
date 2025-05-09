import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { User } from '../model/user.model.js';
import { setOtp, getOtp, removeOtp } from '../utils/setOtp.js';

dotenv.config();
sgMail.setApiKey(process.env.SEND_GRID_KEY);

// STEP 1: Initiate registration and send OTP

export const initiateRegisterUser = asyncHandler(async (req, res) => {
  const { username, mobileNo, fullName, email, role, password } = req.body;

  if ([username, mobileNo, fullName, email, role, password].some(field => !field?.trim())) {
    throw new ApiError(400, "You cannot submit empty fields");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    throw new ApiError(400, "Email or username already registered");
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const msg = {
    to: email,
    from: 'Paryatak24jm@gmail.com', // or use your verified domain email
    subject: 'Verify your account with Paryatak',
    text: `Hi ${fullName},\n\nYour OTP for verifying your Paryatak account is: ${otp}\n\nIf you didn’t request this, please ignore.\n\nThanks,\nTeam Paryatak`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to <span style="color:#2E86C1;">Paryatak</span>!</h2>
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Your OTP for verifying your Paryatak account is:</p>
        <h3 style="background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h3>
        <p>If you didn't request this, please ignore this email.</p>
        <br/>
        <p>Regards,<br/>Team Paryatak</p>
      </div>
    `
  };

  //em7190.paryatakteam  u52516603.wl104.sendgrid.net
  

  try {
    await sgMail.send(msg);
    setOtp(email, otp, { username, mobileNo, fullName, email, role, password });
    res.status(200).json(new ApiResponse(200, null, "OTP sent to email"));
  } catch (error) {
    console.error('Error sending email ❌', error.message);
    throw new ApiError(500, "Failed to send OTP");
  }
});

// STEP 2: Verify OTP and create user
export const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const stored = getOtp(email);

  if (!stored || stored.otp != otp) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const { username, mobileNo, fullName, role, password } = stored.userData;

  let avatar_url = "";
  const avatarFile = req.files?.avatar;

  if (avatarFile) {
    const filePath = Array.isArray(avatarFile) ? avatarFile[0].path : avatarFile.path;
    avatar_url = await uploadFileOnCloudinary(filePath);
  }

  const user = await User.create({
    username,
    mobileNo,
    fullName,
    email,
    role,
    password,
    avatar: avatar_url
  });

  if (!user) throw new ApiError(500, "Failed to create user");

  const token = await user.generateToken();

  // Cleanup OTP after success
  removeOtp(email);

  const userData = user.toObject();
  delete userData.password;

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json(new ApiResponse(200, userData, "User registered successfully"));
});
