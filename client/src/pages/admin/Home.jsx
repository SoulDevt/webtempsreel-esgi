import { NavLink } from 'react-router-dom';

const Home = () => {
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
        <NavLink to="/admin/liste-salon">
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            SALONS DE DISCUSSIONS
          </button>
        </NavLink>
      </div>
      <div className="m-auto w-3/4 ">
        <p className=""> Notifications commerciales </p>
        <div className="border p-2 max-h-64 overflow-scroll felx justify-center">
          <form>
            <div>
              <label for="title" class="flex justify-center">
                Titre
              </label>
              <input
                type="text"
                id="title"
                class="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label for="message" class="flex justify-center">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                class="mx-auto block p-2.5 w-2/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
