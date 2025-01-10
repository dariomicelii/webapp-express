function notFound(req, res, next) {
  res.status(404);
  res.json({
    status: "Ko",
    message: "Not Found",
  });
}

module.exports = notFound;
