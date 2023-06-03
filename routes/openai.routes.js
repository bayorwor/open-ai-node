const { generateMeta } = require("../controllers/openai.controllers");

const router = require("express").Router();

router.route("/").post(generateMeta);

module.exports = router;
