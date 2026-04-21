export const getMessageForm = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("messageForm");
  } else {
    res.redirect("/login");
  }
};
