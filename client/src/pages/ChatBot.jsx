import { useState, useCallback, useRef, useEffect } from 'react';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import fr from 'date-fns/locale/fr';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';

import { SelectOption } from '../components';
import {
  endMessages,
  initOption,
  option2,
  botMessage2,
  option3,
  botMessage3,
  emailMessage,
  telephoneMessage,
  initMessages
} from '../enums';
import { delay } from '../helpers';

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

const today = new Date().toISOString();

const Chatbot = () => {
  const [initChoice, setInitChoice] = useState(true);
  const [choice2, setChoice2] = useState(false);
  const [choice3, setChoice3] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [events, setEvents] = useState([{ start: new Date(), end: new Date(), title: 'special event' }]);
  const [choosenDate, setChoosenDate] = useState(null);
  const [messages, setMessages] = useState(initMessages);
  const messagesEndRef = useRef();

  const handleChoice1 = useCallback(async ({ id, option }) => {
    setInitChoice(false);
    await sendMessage(option, 'human');
    if (id === 2) {
      await sendMessage(botMessage2);
      setChoice2(true);
    } else if (id === 3) {
      await sendMessage(botMessage3);
      setChoice3(true);
    } else if (id === 4) {
      for (let elem in endMessages) {
        await sendMessage(endMessages[elem]);
      }
    }
  }, []);

  const handleChoice2 = useCallback(async ({ id, option }) => {
    setChoice2(false);
    await sendMessage(option, 'human');
    if (id === 1) setCalendar(true);
    else if (id === 2) setCalendar(true);
    else if (id === 3) setCalendar(true);
    else if (id === 4) return setInitChoice(true);
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

  const showUserComponent = useCallback(() => {
    if (initChoice) return <SelectOption options={initOption} chosenOption={handleChoice1} />;
    if (choice2) return <SelectOption options={option2} chosenOption={handleChoice2} />;
    if (choice3) return <SelectOption options={option3} chosenOption={handleChoice3} />;
    if (calendar)
      return (
        <>
          <input type="text" placeholder="Nom" className="border border-slate-800 rounded-md p-2 mr-3" />
          {/* TODO: fix date picker */}
          <DatePicker
            selected={choosenDate}
            onChange={(date) => setChoosenDate(date)}
            value={choosenDate}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="border border-slate-800 rounded-md p-2 z-10 relative"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            minTime={new Date(today)}
            maxTime={new Date(today)}
            timeCaption="Heure"
            placeholderText="Choisissez une date"
          />
          <button>Valider</button>
        </>
      );
  }, [initChoice, choice2, choice3, calendar, choosenDate]);

  const showCalendar = useCallback(() => {
    return (
      <Calendar localizer={localizer} events={events} className="text-slate-800 mt-4" style={{ height: '500px' }} />
    );
  }, [events, calendar]);

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
            {calendar && showCalendar()}
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
