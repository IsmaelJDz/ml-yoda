const express = require("express");
const router = express.Router();
const getInformationController = require("../controllers/getInformationController");
const { check } = require("express-validator");

// api/postInformation
router.post(
  "/",
  [
    check("name.*.", "Name is required").not().isEmpty(),
    check("distance.*.", "Distance is required").not().isEmpty(),
  ],
  getInformationController.getInformation,
);

router.put(
  "/topsecret_split/:satellite",
  [check("satellite", "Satellite is required").not().isEmpty()],
  getInformationController.getInformationSatellite,
);

module.exports = router;
