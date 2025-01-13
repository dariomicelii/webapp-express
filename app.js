//* INIZIALIZZAZIONE EXPRESS
const express = require("express");
const app = express();
const cors = require("cors");
const { APP_HOST, APP_PORT, APP_FRONTEND_URL } = process.env;

//* CONFIGURAZIONE CORS
var corsOptions = {
  origin: APP_FRONTEND_URL,
  optionSuccessStatus: 200,
};

//* REGISTRAZIONE MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions));

//* REGISTRAZIONE ROTTE
const moviesRouter = require("./routers/moviesRouter");
app.use("/api/movies", moviesRouter);

//* ERRORS HANDLER
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

app.use(errorsHandler);
app.use(notFound);

//*MESSA IN ASCOLTO DEL SERVER
app.listen(3000, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}!`);
});
