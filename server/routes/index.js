const router = require("express").Router();

router.use("/security", require("./security"));
router.use("/stream", require("./sseRoute"));
router.use("/notification", require("./notification"));
router.use("/chatbot", require("./chatbot"));
router.use("/salons", require("./salons"));

module.exports = router;