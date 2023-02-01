const { AdminChatList } = require("../models");

const getChatList = async (req, res) => {
  const data = req.body;
  if (!data.admin_id || typeof data.admin_id !== "number") {
    return res.status(401).json({ message: "admin_id non reconnu" });
  }
  try {
    const response = await AdminChatList.findAll({
      where: {
        admin_id: data.admin_id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const postChatList = async (req, res) => {
  const data = req.body;
  console.log(data);
  if (!data.admin_id || typeof data.admin_id !== "number") {
    return res.status(401).json({ message: "admin_id non reconnu" });
  }
  if (!data.user_id || typeof data.user_id !== "number") {
    return res.status(401).json({ message: "user_id non reconnu" });
  }
  try {
    const response = await AdminChatList.create({
      admin_id: data.admin_id,
      user_id: data.user_id,
    });
    res.status(201).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const deleteChatList = async (req, res) => {
  const data = req.body;
  if (!data.admin_id || typeof data.admin_id !== "number") {
    return res.status(401).json({ message: "admin_id non reconnu" });
  }
  if (!data.user_id || typeof data.user_id !== "number") {
    return res.status(401).json({ message: "user_id non reconnu" });
  }
  try {
    const response = await AdminChatList.destroy({
      where: { admin_id: data.admin_id, user_id: data.user_id },
    });
    res.status(204).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const getChat = async (req, res) => {
  const data = req.body;
  if (!data.url || typeof data.url !== "string") {
    return res.status(401).json({ message: "pas de paramètre dans l'url" });
  }
  try {
    const response = await AdminChatList.findOne({
      where: {
        url: data.url,
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};


module.exports = {
  getChat,
  getChatList,
  postChatList,
  deleteChatList,
};
