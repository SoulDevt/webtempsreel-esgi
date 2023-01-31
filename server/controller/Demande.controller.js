const { DemandeCommunication, User } = require("../models");

const getEvents = async (req, res, next) => {
  // liste les demandes
  try {
    const response = await DemandeCommunication.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

const getDemande = async (req, res, next) => {
  const data = req.body;
  if (data.admin_id && typeof data.admin_id === "number") {
    try {
      const response = await DemandeCommunication.findAll({
        where: {
          admin_id: data.admin_id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

const postDemande = async (req, res, next) => {
  // creer une demande
  const data = req.body;
  try {
    if (data.idUser && data.idAdmin) {
      const event = await DemandeCommunication.create({
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
};

const deleteDemande = async (req, res, next) => {
  const data = req.body;
  if (data.id && typeof data.id === "number") {
    try {
      const response = await DemandeCommunication.destroy({
        where: { id: data.id },
      });
      res.status(204).json(response);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  }
};

module.exports = {
  postEvent,
  getEvents,
  deleteDemande,
  getDemande,
};
