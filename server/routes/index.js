const router = require("express").Router();

router.use("/security", require("./security"));
router.use("/stream", require("./sseRoute"));
router.use("/notification", require("./notification"));
router.use("/chatbot", require("./chatbot"));
router.use("/demande", require("./demandeCommunication"));

module.exports = router;
