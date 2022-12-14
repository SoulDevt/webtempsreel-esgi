const { Router } = require("express");
const { NotificationController } = require("../controller");

const router = Router();

router.post("/", NotificationController.postNotification);

module.exports = router;
