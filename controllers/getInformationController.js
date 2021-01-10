const { validationResult } = require("express-validator");
const { calculate, getMessage } = require("../utils/utils");
require("dotenv").config({ path: "variables.env" });

exports.getInformation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { satellite } = req.body;

  /**
   *
   * @param {*} $searchBy Two options search the distances: distances, messages: messages
   */

  const responseDecodedData = $searchBy => {
    return satellite[0].map(data => {
      if ($searchBy === "distances") {
        const distances = data.distance;
        return distances;
      } else if ("messages") {
        const messages = data.message;
        return messages;
      }
    });
  };

  try {
    const ReqBodyDistances = responseDecodedData("distances");
    const responseDistance = calculate(
      ReqBodyDistances[0],
      ReqBodyDistances[1],
      ReqBodyDistances[2],
    );
    const ReqBodyMessages = responseDecodedData("messages");
    const responseMessage = getMessage([
      ReqBodyMessages[0],
      ReqBodyMessages[1],
      ReqBodyMessages[2],
    ]);

    console.log("Final response Distances ---> ", responseDistance);
    console.log("Final Message --->", responseMessage);

    if (responseMessage !== process.env.SECRET_MESSAGE) {
      return res.status(404).json({
        notFound: "Not found",
      });
    } else {
      return res.status(200).json({
        position: responseDistance,
        message: responseMessage,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errors: "server cannot response your request! 🙁" });
  }
};

exports.getInformationSatellite = async (req, res) => {
  console.log(req.body);
};
