const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get( statesController.getAllUsers)
    // .delete( statesController.deleteUser);

router.route('/:id')
    .get( statesController.getState);

module.exports = router;