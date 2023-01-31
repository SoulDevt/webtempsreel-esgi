import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/app-context';

const Home = ({ listAdmin, socket }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { accessToken, loading, setAccessToken } = useContext(AppContext);

  useEffect(() => {
    socket.emit('get');
  }, [socket]);

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
                                <button onClick={(e) => deleteDemande(e, admin.id)}> Envoyer demande </button>
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
