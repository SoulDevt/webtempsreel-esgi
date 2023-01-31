import { Link } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { Notification } from '../../components';
import { AppContext } from '../../contexts/app-context';
import { useEffect } from 'react';
import { serverUrl } from '../../enums';

const Home = ({ nbConnexion, usersAdmin, handleAdmins, socket }) => {
  const { accessToken, loading } = useContext(AppContext);
  const [isAvailable, setIsAvailable] = useState(false);
  const [dataDemandes, setDataDemandes] = useState({});
  // TODO: frontxxx
  /*
    ? interface admin avce liens vers les autres pages
    ? bouton pour se mettre disponible pour le chat
    ? emettre notif
  */
  useEffect(() => {
    socket.on('get_demandes', () => {
      getDemandes();
    });
  }, [socket]);
  const deleteDemande = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${serverUrl}/demande`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      });
      getDemandes();
    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

  const getDemandes = async () => {
    try {
      const res = await fetch(`${serverUrl}/demande`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_id: accessToken.id
        })
      });
      const data = await res.json();
      setDataDemandes(data);
      return data;
    } catch (e) {
      return e.message;
    }
  };

  useEffect(() => {
    if (usersAdmin && usersAdmin.length > 0) {
      usersAdmin.map((admin) => {
        if (admin.id === accessToken.id) {
          setIsAvailable(true);
        }
      });
    }
    getDemandes();
  }, [usersAdmin]);

  const handleStatus = useCallback(
    (e) => {
      if (loading) return;
      const { value } = e.target;
      setIsAvailable(value);
      handleAdmins({ id: accessToken.id, name: accessToken.name, isAvailable: value });
    },
    [loading, accessToken]
  );

  return (
    <div className="container mx-auto">
      <div className="home-admin px-4 flex flex-col justify-center items-center">
        <h1>Nom Admin</h1>
      </div>
      <div className="flex justify-center">Statut :</div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <select
            value={isAvailable}
            onChange={handleStatus}
            className="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0">
            <option className="bg-black" value="true">
              Disponible
            </option>
            <option value="false">Indisponible</option>
          </select>
        </div>
      </div>
      <div className="m-auto w-3/4 ">
        <p> Demande(s) de communication </p>
        <div className="border p-2 max-h-64 overflow-scroll">
          <ul>
            {dataDemandes.length > 0 ? (
              dataDemandes.map((demande) => (
                <div key={demande.id}>
                  <li className="flex">
                    <p className="my-auto">Id de la demande : {demande.id}</p>
                    <div className="ml-auto">
                      <button> Accepter </button>
                      <button onClick={(e) => deleteDemande(e, demande.id)}> Refuser </button>
                    </div>
                  </li>
                  <hr className="my-1" />
                </div>
              ))
            ) : (
              <p> Aucune demande </p>
            )}
          </ul>
        </div>
      </div>
      <div className="text-center mt-5">
        <Link to="/admin/liste-salon">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            SALONS DE DISCUSSIONS
          </button>
        </Link>
      </div>
      <Notification nbConnexion={nbConnexion} />
    </div>
  );
};

export default Home;
