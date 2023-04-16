reqFile = (req, res, next) => {
  if (!req.query.id) {
    res.redirect("signIn");
  } else {
    next();
  }
};
module.exports = reqFile;
