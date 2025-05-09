// otpStore.js
const otpStore = new Map();

export const setOtp = (email, otp, userData) => {
  otpStore.set(email, { otp, userData });

  // Cleanup OTP after 5 minutes
  setTimeout(() => {
    otpStore.delete(email);
    console.log(`OTP for ${email} deleted after 5 mins`);
  }, 5 * 60 * 1000);
};

export const getOtp = (email) => otpStore.get(email);
export const removeOtp = (email) => otpStore.delete(email);
