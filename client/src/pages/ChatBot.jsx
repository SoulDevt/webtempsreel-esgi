import { useState, useCallback, useRef, useEffect } from 'react';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import fr from 'date-fns/locale/fr';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import { SelectOption, EntretienForm } from '../components';
import {
  endMessages,
  botQuestions,
  initOption,
  option2,
  option3,
  emailMessage,
  telephoneMessage,
  initMessages
} from '../enums';
import { delay, checkReservationsValid, checkReservationsNotExist } from '../helpers';

import chatBotImg from '../assets/chatbot.png';
import style from '../styles/chatbot.module.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: getDay,
  getDay,
  locales: { fr }
});

const Chatbot = () => {
  const [initChoice, setInitChoice] = useState(true);
  const [choice1, setChoice1] = useState(false);
  const [choice2, setChoice2] = useState(false);
  const [choice3, setChoice3] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [events, setEvents] = useState([
    { start: new Date(), end: new Date(), title: 'special event', type: 'routier' }
  ]);
  const [eventsShow, setEventsShow] = useState([]);
  const [choosenEvent, setChoosenEvent] = useState({ title: '', date: '', type: '' });
  const [messages, setMessages] = useState(initMessages);
  const messagesEndRef = useRef();

  const handleInitChoice = useCallback(async ({ id, option }) => {
    setInitChoice(false);
    await sendMessage(option, 'human');
    if (id === 1) {
      await sendMessage(botQuestions[0]);
      setChoice1(true);
    } else if (id === 2) {
      await sendMessage(botQuestions[1]);
      setChoice2(true);
    } else if (id === 3) {
      await sendMessage(botQuestions[2]);
      setChoice3(true);
    } else if (id === 4) {
      for (let elem in endMessages) {
        await sendMessage(endMessages[elem]);
      }
    }
  }, []);

  const needAEntretien = useCallback(async (value) => {
    setChoice1(false);
    console.log(value);
    if (value === 'Retour') {
      await sendMessage(value, 'human');
      setInitChoice(true);
      return;
    } else if (value) {
      setCalendar(true);
      setChoosenEvent({
        ...choosenEvent,
        type: 'entretien'
      });
    }
  }, []);

  const handleChoice2 = useCallback(async ({ id, option }) => {
    setChoice2(false);
    await sendMessage(option, 'human');
    if (id === 1) {
      setEventsShow(events.filter((event) => event.type === 'routier'));
      setCalendar(true);
      setChoosenEvent({
        ...choosenEvent,
        type: 'routier'
      });
    } else if (id === 2) {
      setEventsShow(events.filter((event) => event.type === 'tout-terrain'));
      setCalendar(true);
      setChoosenEvent({
        ...choosenEvent,
        type: 'tout-terrain'
      });
    } else if (id === 3) {
      setEventsShow(events.filter((event) => event.type === 'sportif'));
      setCalendar(true);
      setChoosenEvent({
        ...choosenEvent,
        type: 'sportif'
      });
    } else if (id === 4) return setInitChoice(true);
  }, []);

  const handleChoice3 = useCallback(async ({ id, option }) => {
    setChoice3(false);
    await sendMessage(option, 'human');
    if (id === 1) await sendMessage(emailMessage);
    else if (id === 2) await sendMessage(telephoneMessage);
    else if (id === 3) return setInitChoice(true);
    for (let elem in endMessages) {
      await sendMessage(endMessages[elem]);
    }
  }, []);

  const sendMessage = useCallback(
    async (message, type = 'bot') => {
      if (type !== 'bot' && type !== 'human') return;
      const newMessage = {
        id: messages[messages.length - 1].id + 1,
        message: message,
        type: type
      };

      if (type === 'bot') {
        newMessage.message = 'Typing...';
        setMessages([...messages, newMessage]);
        await delay(1500);
        newMessage.message = message;
        messages.push(newMessage);
      } else {
        messages.push(newMessage);
      }
      setMessages(messages);
      return;
    },
    [messages]
  );

  const handleTitle = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setChoosenEvent({ ...choosenEvent, [name]: value });
    },
    [choosenEvent]
  );

  const handleDatePicker = useCallback(
    (value) => {
      setChoosenEvent({ ...choosenEvent, date: value });
    },
    [choosenEvent]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      let res = checkReservationsValid(choosenEvent);
      if (typeof res === 'string') {
        setChoosenEvent({ ...choosenEvent, title: '', date: '' });
        return toast.error(res);
      }

      const otherReservations = events.filter((event) => event.type === choosenEvent.type);
      res = checkReservationsNotExist(res, otherReservations);
      if (typeof res === 'string') {
        setChoosenEvent({ title: '', date: '', type: '' });
        return toast.error(res);
      }
      // TODO : ajouter la reservation dans la base de données
      setEvents([...events, res]);
      setCalendar(false);
      setChoosenEvent({ title: '', date: '', type: '' });
      await sendMessage('Votre réservation a bien été prise en compte');
      await sendMessage('Retour au menu principal');
      await sendMessage(initMessages[0].message);
      await sendMessage(initMessages[1].message);
      setInitChoice(true);
    },
    [events, choosenEvent]
  );

  const showUserComponent = useCallback(() => {
    if (initChoice) return <SelectOption options={initOption} chosenOption={handleInitChoice} />;
    else if (choice1) return <EntretienForm submit={needAEntretien} />;
    else if (choice2) return <SelectOption options={option2} chosenOption={handleChoice2} />;
    else if (choice3) return <SelectOption options={option3} chosenOption={handleChoice3} />;
    else if (calendar)
      return (
        <form className="flex items-center w-full">
          <input
            type="text"
            placeholder="Titre de la réservation"
            className="border border-slate-800 rounded-md p-2 mr-3"
            name="title"
            value={choosenEvent.title}
            onInput={handleTitle}
          />
          <DatePicker
            name="date"
            selected={choosenEvent.date}
            onChange={handleDatePicker}
            value={choosenEvent.date}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="border border-slate-800 rounded-md p-2 z-10 relative"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            minTime={new Date().setHours(9, 0, 0)}
            maxTime={new Date().setHours(17, 0, 0)}
            timeCaption="Heure"
            placeholderText="Choisissez une date"
          />
          <button type="submit" className=" dark:text-gray-200 hover:text-gray-400 bg-slate-800" onClick={handleSubmit}>
            Valider
          </button>
        </form>
      );
  }, [initChoice, choice1, choice2, choice3, calendar, choosenEvent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.offsetHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="Chatbot container mx-auto px-4 flex flex-col justify-center items-center">
      <h1>Chatbot</h1>

      <div className={style.wrapper}>
        <div className="content">
          <div className="flex items-center">
            <img className={style.img} src={chatBotImg} alt="chatbot image" />
            <h2 className="text-slate-800 font-semibold ml-2">Le bot</h2>
          </div>
          <div ref={messagesEndRef} className={`${style.main} snap-y scrollbar`}>
            <div className={style.messages}>
              {messages.length &&
                messages.map((message) => (
                  <div className={message.type === 'bot' ? style.messageLeft : style.messageRight} key={message.id}>
                    <p className={message.type === 'bot' ? style.botMessage : style.humanMessage}>{message.message}</p>
                  </div>
                ))}
            </div>
            {calendar && (
              <Calendar
                localizer={localizer}
                events={eventsShow}
                className="text-slate-800 mt-4"
                style={{ height: '500px' }}
              />
            )}
          </div>

          <div className={style.bottom}>
            <div className="flex items-center">{showUserComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
