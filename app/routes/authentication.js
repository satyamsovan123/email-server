const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { verifyAuthenticationDataRequest } = require("../middlewares");
const { verifyJWT } = require("../middlewares");
const { changeAPIKey } = require("../controllers/authentication/changeAPIKey");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/changeapikey", verifyJWT, changeAPIKey);
router.post("/signin", verifyAuthenticationDataRequest, signIn);

module.exports = router;
