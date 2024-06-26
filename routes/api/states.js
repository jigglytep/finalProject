const express = require("express");
const router = express.Router();
const statesController = require("../../controllers/statesController");


router.route("/").get(statesController.getAllStates);
// .delete(statesController.deleteUser);

router.route("/:slug/funfact").get(statesController.getFunFact).post(statesController.statePostAppend)
.patch(statesController.statePatch)
.delete(statesController.stateDelete);

router.route("/:slug").get(statesController.getState);

router.route("/:slug/capital").get(statesController.getCapital);

router.route("/:slug/nickname").get(statesController.getNickname);
router.route("/:slug/population").get(statesController.getPopulation);
router.route("/:slug/admission").get(statesController.getAdmission);

module.exports = router;
