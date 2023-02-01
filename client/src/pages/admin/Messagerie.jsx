import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../enums';
import { AppContext } from '../../contexts/app-context';

const Messagerie = ({ socket }) => {
  const { accessToken, setAccessToken } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChatList();
    if (chatList.length > 0) {
      socket.emit('get_chatlist', chatList);
    }
  }, []);

  const getChatList = async () => {
    try {
      const res = await fetch(`${serverUrl}/admin/chatlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_id: accessToken.id
        })
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return data.error;
      }
      setChatList(data);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  const openChat = async (e, url) => {
    e.preventDefault();
    socket.emit('join_room', url);
    navigate(`/messagerie/${url}`);
  };

  return (
    <div className="container mx-auto">
      <div className="home-admin px-4 flex flex-col justify-center items-center">
        <h1>Messagerie</h1>
      </div>
      {chatList && chatList.length > 0 ? (
        chatList.map((elem, index) => (
          <div key={index}>
            <li className="flex">
              <p className="my-auto">id user : {elem.user_id}</p>
              <div className="ml-auto">
                <button className="btn btn-primary" onClick={(e) => openChat(e, elem.url)}>
                  Ouvrir
                </button>
              </div>
            </li>
            <hr className="my-1" />
          </div>
        ))
      ) : (
        <p>Vous n'avez pas de chat</p>
      )}
    </div>
  );
};

export default Messagerie;
