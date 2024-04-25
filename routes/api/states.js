const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');


router.route('/')
    .get(statesController.getAllStates);
    // .delete(statesController.deleteUser);

router.route('/:slug')
    .get(statesController.getState);

module.exports = router;