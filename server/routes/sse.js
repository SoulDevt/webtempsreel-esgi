const { Router } = require("express");
const { NotificationController } = require("../controller");

const router = new Router();

router.get("/notification", NotificationController.getNotification);
router.post("/notification", NotificationController.postNotification);

module.exports = router;
