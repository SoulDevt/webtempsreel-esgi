import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/app-context';
import { serverUrl } from '../enums';
const Home = ({ listAdmin, socket }) => {
  const { accessToken, loading } = useContext(AppContext);
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
          user_id: accessToken.id,
          status: 'En attente'
        })
      });
      socket.emit('get_demandes');
      getDemandeByUser();
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
      return data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  useEffect(() => {
    if (accessToken && !accessToken.isAdmin) {
      getDemandeByUser();
    }
    socket.on('get_demandes_user', () => {
      if (accessToken && !accessToken.isAdmin) {
        getDemandeByUser();
      }
    });
  }, [socket, accessToken, loading]);
  let test = true;

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
                                      if (demande.admin_id === admin.id && demande.status === 'En attente') {
                                        test = false;
                                        return <p key={demande.id}> En attente </p>;
                                      }
                                    })
                                  : null}
                                {test && <button onClick={(e) => postDemande(e, admin.id)}>Envoyer demande</button>}
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
