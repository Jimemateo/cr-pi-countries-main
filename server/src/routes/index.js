const { Router } = require("express");
const {
  getActivities,
  postActivity,
  deleteActivity,
} = require("../controllers/get_post_deleteActivities");
const { getCountry } = require("../controllers/getCountry");
const { getCountryById } = require("../controllers/getCountryById");

const router = Router();

//Rutas definidas en cada controller, solo las usamos;

router.get("/countries/:id", getCountryById);

router.get("/countries", getCountry);

router.post("/activity", postActivity);

router.get("/activity", getActivities);

router.delete("/activity", deleteActivity);

module.exports = router;
