const satelliteDB = require("../models/satelliteSchema");
const { validationResult } = require("express-validator");
const { calculate, getMessage } = require("../utils/utils");
require("dotenv").config({ path: "variables.env" });

/**
 *
 * @param {*} req express params req: client body
 * @param {*} res express params res: insert individual satellite
 * TO DO: get coordinates and the decoded message
 */

exports.getInformation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { satellite } = req.body;

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

    if (responseMessage.toLowerCase() !== process.env.SECRET_MESSAGE) {
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

/**
 *
 * @param {*} req express params req: client body
 * @param {*} res express params res: insert individual satellite
 * TO DO: insert individual satellite
 */

exports.getInformationSatellite = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { distance, message } = req.body;

    const existSatellite = await satelliteDB.find({
      name: req.params.satellite,
    });

    let joinResponse = {
      name: req.params.satellite,
      distance,
      message,
    };

    if (existSatellite.length && existSatellite.length <= 3) {
      return res.status(201).json({
        msg: `${req.params.satellite} already exist! ❌, or you can only create three satellites 🛠`,
      });
    } else {
      const satellite = new satelliteDB(joinResponse);
      await satellite.save();
      return res.status(200).json({ msg: "Okay ✓" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errors: "server cannot response your request! 🙁 😣" });
  }
};

/**
 *
 * @param {*} req express params req: client body
 * @param {*} res express params res: res to send the client
 * TO DO: get all information about the satellites
 */

exports.getFullInformationSatellite = async (req, res) => {
  const dataIsComplete = await satelliteDB.find({});

  const sortData = dataIsComplete.map(data => {
    const orderData = {
      name: data.name,
      distance: data.distance,
      message: data.message,
    };
    return orderData;
  });

  if (dataIsComplete.length <= 2) {
    res.status(200).json({ data: "incomplete data 🔎" });
  } else {
    res.status(200).json({ satellite: sortData });
  }
};

/**
 *
 * @param {*} req , this method does not need params
 * TO DO: delete all satellites in DB, if you want to try with others
 */

exports.deleteFullSatellites = async (req, res) => {
  try {
    await satelliteDB.remove({});
    res.status(200).json({ data: "all data deleted 🙁 ❌" });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: "server cannot response your request! 🙁" });
  }
};
