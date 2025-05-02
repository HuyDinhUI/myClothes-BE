import jwt from "jsonwebtoken";
import ms from "ms";
const oauthCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: ms("14 days"),
  });

  
  const redirectUrl = `${process.env.FRONTEND_URL}/dashboards/Account Settings`;
  res.redirect(redirectUrl);
};

export default oauthCallback;
