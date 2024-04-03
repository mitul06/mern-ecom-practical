const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");

const { dbConfig } = require("./dbConfig");
const { rootRouter } = require("../routes/rootRoutes");
const { errorHandler } = require("../utils/handlers/errorHandlers");

const appServer = (app, port, db_url) => {
  app.use(morgan());
  app.use(helmet());

  app.use(bodyParser.json({ limit: "200mb" }));

  app.use(
    bodyParser.urlencoded({
      limit: "200mb",
      extended: true,
      parameterLimit: 1000000,
    })
  );

  app.use(
    session({
      secret: "skskkkrkrkksss",
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongoUrl: `${db_url}/practical`,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: "native",
      }),
    })
  );

  // passport
  require("../middlewares/passport");
  app.use(passport.initialize());
  app.use(passport.session());

  // db connection
  dbConfig(db_url);

  app.use((req, res, next) => {
    // eslint-disable-next-line max-len
    const allowedOrigins = ["http://localhost:5173"];
    const { origin } = req.headers;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // Request methods
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization,X-Requested-With,content-type,sessionID,Accept,Origin,Cache"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  });

  // api routes
  app.use("/api", rootRouter);

  // error handlers
  app.use(errorHandler);

  // port listen
  app.listen(port, () => {
    console.log(`App running on http://localhost:${[port]}`);
  });
};

module.exports = {
  appServer,
};
