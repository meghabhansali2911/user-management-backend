const express = require("express");
const router = express.Router();

//schemaValidator
const validatorResponse = require("../../utility/joiValidator");

//schemas
const { createUserSchema, signInUserSchema, editUserSchema, } = require("../validationSchema/apiValidationSchema");


//controller
const { createUserController, signInUserController, userListController, editUserController, getUserInfoController } = require("../controllers/apiController");
const { authMiddleware } = require("../../utility/token");
const roleEnum = require("../../utility/roleEnum");


//routes
router.post('/create-new-user', validatorResponse(createUserSchema), createUserController);

router.post('/sign-in', validatorResponse(signInUserSchema), signInUserController);

router.get('/user-profile', authMiddleware(Object.values(roleEnum)), getUserInfoController);

router.post('/edit-user-details', authMiddleware(Object.values(roleEnum)), validatorResponse(editUserSchema), editUserController);

router.get('/user-list', authMiddleware([roleEnum.ADMIN, roleEnum.MODERATOR]), userListController);

module.exports = router;    