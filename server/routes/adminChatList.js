const { Router } = require("express");
const { AdminChatListController } = require("../controller");

const router = Router();

router.post("/chatlist", AdminChatListController.getChatList);
router.post("/chatlist/create", AdminChatListController.postChatList);
router.post("/chatlist/delete", AdminChatListController.deleteChatList);

module.exports = router;
