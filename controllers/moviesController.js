const connection = require("../db/conn");

function index(req, res) {
  connection.query("SELECT * FROM `movies`", (err, results) => {
    console.log(results);
  });

  res.json({
    message: "ok",
  });
}

module.exports = { index };
