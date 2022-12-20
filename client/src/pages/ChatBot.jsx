import { useState, useCallback } from 'react';
import chatBotImg from '../assets/chatbot.png';
import style from '../styles/chatbot.module.css';
import { SelectOption } from '../components';
import { endMessages, option1, option3, botMessage3 } from '../enums';
import { delay } from '../helpers';

const Chatbot = () => {
  const [choice1, setChoice1] = useState(true);
  const [choice3, setChoice3] = useState(false);
  const [messages, setMessages] = useState([
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
  ]);

  const handleChoice1 = async ({ id, option }) => {
    const minDelay = 2000;
    setChoice1(false);
    await sendMessage(option, 'human');
    if (id === 4) {
      for (let elem in endMessages) {
        await sendMessage(endMessages[elem]);
      }
    }
    if (id === 3) {
      await sendMessage(botMessage3);
      setChoice3(true);
    }
  };

  const handleChoice3 = useCallback(() => {
    // setChoice3(true);
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
  // const endStep = useCallback(() => {
  //   endMessage.map((elem) => {
  //     messages.push({
  //       id: messages[messages.length - 1].id + 1,
  //       message: elem,
  //       type: 'bot'
  //     });
  //   });
  //   setMessages(messages);
  // }, []);

  const showComponent = useCallback(() => {
    if (choice1) return <SelectOption options={option1} chosenOption={handleChoice1} />;
    if (choice3) return <SelectOption options={option3} chosenOption={handleChoice3} />;
  }, [choice1, choice3]);

  return (
    <div className="Chatbot container mx-auto px-4 flex flex-col justify-center items-center">
      <h1>Chatbot</h1>

      <div className={style.wrapper}>
        <div className="content">
          <div className="flex items-center">
            <img className={style.img} src={chatBotImg} alt="chatbot image" />
            <h2 className="text-slate-800 font-semibold ml-2">Le bot</h2>
          </div>
          <div className={`${style.main} snap-y scrollbar`}>
            <div className={style.messages}>
              {messages.map((message) => (
                <div className={message.type === 'bot' ? style.messageLeft : style.messageRight} key={message.id}>
                  <p className={message.type === 'bot' ? style.botMessage : style.humanMessage}>{message.message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={style.bottom}>
            <div className="flex items-center">{showComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
