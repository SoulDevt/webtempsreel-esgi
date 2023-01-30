// Fonction pour accepter ou refuser une demande de chat
app.post("/api/chat/request/:id/:action", (req, res) => {
  const { id, action } = req.params;
  // Vérifier que l'admin est bien celui qui a reçu la demande
  ChatRequest.findById(id, (err, chatRequest) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Erreur lors de la recherche de la demande",
      });
    }
    if (!chatRequest) {
      return res
        .status(404)
        .send({ success: false, message: "Demande non trouvée" });
    }
    if (chatRequest.adminId.toString() !== req.user._id.toString()) {
      return res.status(401).send({
        success: false,
        message: "Vous n'êtes pas autorisé à gérer cette demande",
      });
    }
    if (action === "accept") {
      // Créer un salon de chat avec le client
      const chat = new Chat({
        participants: [req.user._id, chatRequest.clientId],
      });
      chat.save((err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Erreur lors de la création du salon de chat",
          });
        }
        // Supprimer la demande de chat
        chatRequest.remove((err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: "Erreur lors de la suppression de la demande",
            });
          }
          // Envoyer une notification au client pour lui indiquer que la demande a été acceptée
          chatRequest.client.sendNotification(
            "Votre demande de chat a été acceptée"
          );
          return res.send({ success: true });
        });
      });
    } else {
      // Supprimer la demande de chat
      chatRequest.remove((err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Erreur lors de la suppression de la demande",
          });
        }
        // Envoyer une notification au client pour lui indiquer que la demande a été refusée
        chatRequest.client.sendNotification(
          "Votre demande de chat a été refusée"
        );
        return res.send({ success: true });
      });
    }
  });
});
