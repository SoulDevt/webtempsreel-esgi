const { Router } = require("express");
const { DemandeController } = require("../controller");

const router = Router();

router.get("/", DemandeController.getEvents);
router.post("/", DemandeController.postEvent);

module.exports = router;
