const connection = require("../db/conn");

function index(req, res) {
  const sql = `
  SELECT id, title,  director, genre, release_year, image
  FROM movies`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "ko",
        message: "Database query failed",
      });
    }
    const movies = results.map((movie) => ({
      ...movie,
      image: generateMovieImagePath(),
    }));

    console.log(results);

    res.json({
      status: "ok",
      movies: movies,
    });
  });
}

function show(req, res) {
  const movieId = req.params.id;
  const sqlMovie = `
  SELECT id, title,  director, genre, release_year, abstract, image
  FROM movies
  WHERE id = ?`;
  connection.query(sqlMovie, [movieId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "ko",
        message: "Database query failed",
      });
    }
    const [movie] = results;

    res.json({
      status: "ok",
      movie,
    });
  });
}

const generateMovieImagePath = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/img/${imageName}`;
};

module.exports = { index, show };
