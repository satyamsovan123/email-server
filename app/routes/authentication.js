const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { verifyAuthenticationRequest } = require("../middlewares");
const { verifyJWTRequest } = require("../middlewares");
const { changeAPIKey } = require("../controllers/authentication/changeAPIKey");

router.post("/signup", verifyAuthenticationRequest, signUp);
router.post("/changeapikey", verifyJWTRequest, changeAPIKey);
router.post("/signin", verifyAuthenticationRequest, signIn);

module.exports = router;
