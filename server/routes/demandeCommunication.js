const { Router } = require("express");
const { DemandeController } = require("../controller");

const router = Router();

router.get("/", DemandeController.getEvents);
router.post("/", DemandeController.getDemande);
router.post("/create", DemandeController.postDemande);
router.post("/check", DemandeController.getDemandeByUser);
router.delete("/", DemandeController.deleteDemande);

module.exports = router;
