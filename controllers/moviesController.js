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
      image: generateMovieImagePath(movie.image),
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

    if (!movie) {
      return res.status(404).json({
        status: "ko",
        message: "Movie not found",
      });
    }

    movie.image = generateMovieImagePath(movie.image);

    const sqlRewies = `
    SELECT id, name, vote, text
    FROM reviews
    WHERE movie_id = ?`;

    connection.query(sqlRewies, [movieId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "ko",
          message: "Database query failed",
        });
      }
      movie.reviews = results;

      res.json({
        status: "ok",
        movie,
      });
    });
  });
}

const generateMovieImagePath = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/img/${imageName}`;
};

module.exports = { index, show };
