import { useEffect, useContext, useState } from 'react';
import { serverUrl } from '../../enums';
import { AppContext } from '../../contexts/app-context';

const Messagerie = ({ socket }) => {
  const { accessToken, setAccessToken } = useContext(AppContext);
    const [chatList, setChatList] = useState([]);
    
  useEffect(() => {
    getChatList();
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

  return (
    <div className="container mx-auto">
      <div className="home-admin px-4 flex flex-col justify-center items-center">
        <h1>Messagerie</h1>
      </div>
    </div>
  );
};

export default Messagerie;
