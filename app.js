const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const morganBody = require("morgan-body");
require("dotenv").config({ path: "variables.env" });

const app = express();

/**
 * if the port 3000 in not available, use 3001
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
 * DB isn't not necessary in this case!!
 */
//connectDB();

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

/**
 * Start express server
 */
app.listen(PORT, () => {
  console.log(`🛠 Server on http://localhost:${PORT} ✅ Good luck jedi 😎`);
});
