export const checkReservationsValid = (values) => {
  const { date, title, type } = values;
  if (!date || !title || !type) return 'Please fill in all fields';
  if (date < new Date()) return 'Please select a valid date';
  if (date.getHours() < 9 || date.getHours() > 18) return 'Please select a valid hours';
  if (title.length < 3) return 'Title must be at least 3 characters';

  const end = date + date.setHours(date.getHours() + 1);

  return { title, start: date, end: end, type };
};

export const checkReservationsNotExist = (event, events) => {
  const { start, end } = event;
  if (events.length === 0) return event;

  const isEventExist = events.some((e) => {
    return (start < e.start && e.start > end) || (start < e.end && e.end > end);
  });

  if (isEventExist) return 'This reservation already exist';
  return event;
};
