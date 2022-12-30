const { Router } = require("express");
const { ChatbotController } = require("../controller");

const router = Router();

router.get("/events", ChatbotController.getEvents);
router.post("/event", ChatbotController.postEvent);

module.exports = router;
