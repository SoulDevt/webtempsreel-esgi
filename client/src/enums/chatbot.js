const email = process.env.EMAIL;
const telephone = process.env.TELEPHONE;
export const initMessages = [
  {
    id: 1,
    message: "Bonjour, je suis le bot de l'entreprise",
    type: 'bot'
  },
  {
    id: 2,
    message: 'Comment puis-je vous aider ?',
    type: 'bot'
  }
];

export const option1 = [
  {
    id: 1,
    option: 'Entretien de son véhicule'
  },
  {
    id: 2,
    option: 'Informations sur les véhicules'
  },
  {
    id: 3,
    option: 'Informations de contact'
  },
  {
    id: 4,
    option: 'Pas de demande'
  }
];

export const option3 = [
  {
    id: 1,
    option: 'Email'
  },
  {
    id: 2,
    option: 'Telephone'
  },
  {
    id: 3,
    option: 'Retour'
  }
];

export const botMessage3 = ['Vous souhaitez être contacté par email ou par téléphone ?'];
export const endMessages = ["J'espère vous êtes satisfait de votre demande.", 'Bonne journée !'];
export const emailMessage = `Voici notre email : ${email}`;
export const telephoneMessage = `Voici notre telephone : ${telephone}`;
