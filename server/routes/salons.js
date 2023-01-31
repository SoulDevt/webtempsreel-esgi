const { Router } = require("express");
const { RoomsController } = require("../controller");

const router = Router();

router.get("/getall", RoomsController.getRooms);
router.post("/create", RoomsController.postRoom);
// router.delete("/delete", ChatbotController.postEvent);
// router.patch("/edit", ChatbotController.postEvent);

module.exports = router;
