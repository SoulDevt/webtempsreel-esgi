import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';
const Home = ({ nbConnexion }) => {
  // TODO: front
  /* 
    ? interface admin avce liens vers les autres pages
    ? bouton pour se mettre disponible pour le chat
    ? emettre notif
  */
  return (
    <div className="container mx-auto">
      <div className="home-admin px-4 flex flex-col justify-center items-center">
        <h1>Nom Admin</h1>
      </div>
      <div className="flex justify-center">Statut :</div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <select
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
            <option className="bg-black teub zeob zob dsd" value="true">
              Disponible
            </option>
            <option selected value="false">
              Indisponible
            </option>
          </select>
        </div>
      </div>
      <div className="m-auto w-3/4 ">
        <p className=""> Demande de communication </p>
        <div className="border p-2 max-h-64 overflow-scroll">
          <ul>
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM UTILISATEUR</p>
              <div className="ml-auto">
                <button> Accepter </button> <button> Refuser </button>
              </div>
            </li>
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
      <Notification nbConnexion={nbConnexion}></Notification>
    </div>
  );
};

export default Home;
