const { ChabotEvent } = require("../models");

const getEvents = async (req, res, next) => {
  try {
    const response = await ChabotEvent.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const postEvent = async (req, res, next) => {
  const data = req.body;
  try {
    if (
      data.type === "entretien" ||
      data.type === "routier" ||
      data.type === "tout-terrain" ||
      data.type === "sportif"
    ) {
      const event = await ChabotEvent.create({
        type: data.type,
        title: data.title,
        start: data.start,
        end: data.end,
      });
      return res.sendStatus(201);
    } else {
      return res.status(401).json({ message: "Type d'évènement non reconnu" });
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }

  // console.error(error);
};

module.exports = {
  postEvent,
  getEvents,
};
