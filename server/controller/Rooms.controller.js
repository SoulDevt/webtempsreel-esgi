const { RoomEvent } = require("../models");

const getRooms = async (req, res, next) => {
  try {
    const response = await RoomEvent.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const postRoom = async (req, res, next) => {
  const data = req.body;
  try {
      const event = await RoomEvent.create({
        title: data.title,
        limits: data.limits
      });
      return res.sendStatus(201);
     
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }

  // console.error(error);
};

module.exports = {
  getRooms,
  postRoom,
};
