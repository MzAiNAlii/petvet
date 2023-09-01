export const otpRouter = ()=>{
    //Generate a random OTP
    const generateOTP = () => {
      const digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++) {
         OTP += digits[Math.floor(Math.random() * 10)];
      }
        return OTP;
    };
      //const userotp = generateOTP();
      const generateOTPWithExpiration = () =>{
        const userotp = generateOTP();
        let currentTime = new Date();
        let futureTime = new Date(currentTime.getTime() + 60000)
        let expirationTime = futureTime.toTimeString().slice(0, 8);
        return {
          userotp,
          expirationTime,
        }
      }
      const otpToken = generateOTPWithExpiration(); // Generate OTP with 1 minutes expiration time
      return otpToken;
              
  }