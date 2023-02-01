import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/app-context';
import { serverUrl } from '../enums';
const Home = ({ listAdmin, socket }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { accessToken, loading, setAccessToken } = useContext(AppContext);
  const [dataDemandes, setDataDemandes] = useState({});

  const postDemande = async (e, admin_id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${serverUrl}/demande/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_id: admin_id,
          user_id: accessToken.id
        })
      });
      console.log(res);
      socket.emit('get_demandes');
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  const getDemandeByUser = async () => {
    try {
      const res = await fetch(`${serverUrl}/demande/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: accessToken.id
        })
      });
      const data = await res.json();
      setDataDemandes(data);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  useEffect(() => {
    socket.emit('get');
    if (accessToken && !accessToken.isAdmin) {
      getDemandeByUser();
    }
  }, [socket, accessToken]);

  return (
    <div className="Home container mx-auto px-4 flex flex-col justify-center items-center">
      {accessToken ? (
        <>
          {accessToken.isAdmin ? (
            <h1>Bienvenue sur la page d'accueil admin</h1>
          ) : (
            <>
              <h1>Bienvenue sur la page d'accueil</h1>
              <div className="m-auto w-3/4 ">
                <p> Demande(s) de communication </p>
                <div className="border p-2 max-h-64 overflow-scroll">
                  {loading ? (
                    <h2>Chargement...</h2>
                  ) : (
                    <ul>
                      {listAdmin.length > 0 ? (
                        listAdmin.map((admin) => (
                          <div key={admin.id}>
                            <li className="flex">
                              <p className="my-auto">{admin.name}</p>
                              <div className="ml-auto">
                                {dataDemandes && dataDemandes.length > 0
                                  ? dataDemandes.map((demande) => {
                                      if (demande.admin_id === admin.id) {
                                        return <p key={demande.id}> En attente </p>;
                                      } else {
                                        return (
                                          <button key={demande.id} onClick={(e) => postDemande(e, admin.id)}>
                                            Envoyer demande
                                          </button>
                                        );
                                      }
                                    })
                                  : null}
                              </div>
                            </li>
                            <hr className="my-1" />
                          </div>
                        ))
                      ) : (
                        <p> Aucun administrateur de disponible </p>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Bienvenue sur la page d'accueil</h1>
        </>
      )}
    </div>
  );
};

export default Home;
