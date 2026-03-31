export const sendToken = async (statusCode, user, res) => {
  const token = await user.generateToken();
  res.setHeader("Authorizatgion", `Bearer ${token}`);
  res.status(statusCode).json({
    success: true,
    user,
    token,
    message: "Login Successfully",
  });
};
