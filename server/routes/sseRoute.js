const { Router } = require("express");
const { NotificationController } = require("../controller");

const router = Router();

router.get("/", NotificationController.getNotification);

module.exports = router;
