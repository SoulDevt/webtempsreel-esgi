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

export const initOption = [
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

export const botQuestions = [
  "Veuillez renseigner l'année et la date de votre dernière entretien",
  "Quelle est votre type d'usage ?",
  'Vous souhaitez être contacté par email ou par téléphone ?'
];

export const option2 = [
  {
    id: 1,
    option: 'Routier'
  },
  {
    id: 2,
    option: 'Tout terrain'
  },
  {
    id: 3,
    option: 'Sportif'
  },
  {
    id: 4,
    option: 'Retour'
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

export const option4 = [
  {
    id: 1,
    option: 'Oui'
  },
  {
    id: 2,
    option: 'Non'
  }
];

export const endMessages = ["J'espère vous êtes satisfait de votre demande.", 'Bonne journée !'];
export const resetWorkflow = ['Votre réservation a bien été prise en compte', 'Réinitialisation du workflow']
export const emailMessage = `Voici notre email : ${email}`;
export const telephoneMessage = `Voici notre telephone : ${telephone}`;
