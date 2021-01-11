const express = require("express");
const router = express.Router();
const getInformationController = require("../controllers/getInformationController");
const { check } = require("express-validator");

/**
 * Rotes and validation for send the controllers
 */

router.post(
  "/",
  [
    check("name.*.", "Name is required").not().isEmpty(),
    check("distance.*.", "Distance is required").not().isEmpty(),
  ],
  getInformationController.getInformation,
);

router.post(
  "/:satellite",
  [
    check("distance", "Distance is required").not().isEmpty(),
    check("message", "Message must an array").isArray(),
  ],
  getInformationController.getInformationSatellite,
);

router.get("/", getInformationController.getFullInformationSatellite);

router.delete("/", getInformationController.deleteFullSatellites);

module.exports = router;
