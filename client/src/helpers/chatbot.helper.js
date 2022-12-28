import dayjs from 'dayjs';

export const checkReservationsValid = (values) => {
  const { date, title, type } = values;

  if (!date || !title || !type) return 'Veuillez remplir tous les champs';
  if (date < Date.now()) return 'Veuillez sélectionner une date valide';
  if (date.getHours() < 9 || date.getHours() > 18) return 'Veuillez sélectionner une heure valide';
  if (title.length < 3) return 'Le titre doit contenir au moins 3 caractères';

  const end = dayjs(date).add(1, 'h').toDate();

  return { title, start: date, end: end, type };
};

export const checkReservationsNotExist = (event, events) => {
  const { start, end } = event;
  if (events.length === 0) return event;

  const isEventExist = events.some((e) => {
    return (start < e.start && e.start > end) || (start < e.end && e.end > end);
  });

  if (isEventExist) return 'Un rendez-vous existe déjà à cette date';
  return event;
};

export const isLastEntretienBeforeAYear = (lastEntretien) => {
  if (!lastEntretien) return 'Veuillez renseigner la date de votre dernier entretien';
  const lastEntretienDate = dayjs(lastEntretien);
  const oneYearBefore = dayjs().subtract(1, 'year');
  return lastEntretienDate.isBefore(oneYearBefore);
}