const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const morganBody = require("morgan-body");
require("dotenv").config({ path: "variables.env" });

const app = express();

/**
 * if the port 4000 in not available, use 4001
 */

const PORT = process.env.PORT || 4001;

/**
 * Enable JSON in BodyParser
 */
app.use(bodyParser.json());

/**
 * Enable the logs on request and show type of request is it, in the app
 */
morganBody(app);

/**
 * MongoDB data connect
 * Save data individual of request post!!
 */
connectDB();

/**
 * Cors for enable foreign request
 */
app.use(cors());

/**
 * Enable expressJSON
 */
app.use(express.json({ extended: true }));

/**
 * Routes
 */
app.use("/api/topsecret", require("./routes/getInformation"));
app.use("/api/topsecret_split/", require("./routes/getInformation"));
app.use("/api/topsecret_split/", require("./routes/getInformation"));
app.use("/api/topsecret_delete/", require("./routes/getInformation"));

/**
 * If the api route doesn't exist, it send a response 404
 */
app.use((req, res) => {
  res.status(404).json({ notFound: "Not found" });
});

/**
 * Start express server
 */
app.listen(PORT, () => {
  console.log(`🛠 Server on http://localhost:${PORT} ✅ Good luck jedi 😎`);
});
