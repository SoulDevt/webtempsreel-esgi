const { ChabotEvent } = require("../models");

const getEvents = (req, res, next) => {
  ChabotEvent.findAll()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
};

const postEvent = async (req, res, next) => {
  const data = req.body;
  try {
    // const events = await ChabotEvent.find({ where: { type: data.type } });
    if (
      data.type === "entretien" ||
      data.type === "routier" ||
      data.type === "toutTerrain" ||
      data.type === "sportif"
    ) {
      const event = await ChabotEvent.create({
        type: data.type,
        title: data.title,
        start: data.start,
        end: data.end,
      });
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
