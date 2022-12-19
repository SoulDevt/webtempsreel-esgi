import { useState, useCallback } from 'react';
import chatBotImg from '../assets/chatbot.png';
import style from '../styles/chatbot.module.css';
import { Step1 } from '../components';
import { endMessage } from '../helpers';

const Chatbot = () => {
  const [step1, setStep1] = useState(true);
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

  const handleStep1 = useCallback((val) => {
    if(val === 4) endStep();
  
    setStep1(false);
    console.log(val, 'step1');
  }, [step1]);
  
  const endStep = useCallback(() => {
    endMessage.map((elem) => {
      console.log(messages)
      messages.push({
        id: messages[messages.length-1].id+1,
        message: elem,
        type: 'bot'
      })
    })
    setMessages(messages);
  }, [])

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
            <div className="flex items-center">{step1 && <Step1 chosenOption={handleStep1} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
