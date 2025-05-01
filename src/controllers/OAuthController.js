import jwt from "jsonwebtoken";
import ms from "ms";
const oauthCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ms("14 days"),
  });

  // Redirect về frontend với token
  const redirectUrl = `${process.env.FRONTEND_URL}/dashboards/Account Settings?token=${token}`;
  res.redirect(redirectUrl);
};

export default oauthCallback;
