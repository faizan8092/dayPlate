module.exports = function validateTask(req, res, next) {
//   console.log("validateTask running, body:", req.body);
  const { title, completed } = req.body || {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed should be true or false" });
  }

  console.log("validateTask passed ✅");
  next();
};
