import { Link } from 'react-router-dom';

const ListeSalon = () => {
  // TODO : front
  /*
    ? liste des salons
    ? bouton pour créer un salon
    ? bouton pour supprimer un salon
    ? lien vers la gestion des salons
  */
  return (
    <div className="container mx-auto">
      <div className="home-admin px-4 flex flex-col justify-center items-center">
        <h1>Liste des salons</h1>
      </div>
      <div className="m-auto w-3/4 my-4">
        <p className=""> Créer un salon </p>
        <div className="border p-2 max-h-64 overflow-scroll">
          <form>
            <div>
              <label for="titleRoom" class="flex justify-center">
                Nom du salon
              </label>
              <input
                type="text"
                id="titleRoom"
                class="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label for="limitMaxUser" class="flex justify-center">
                Limite de places
              </label>
              <input
                type="number"
                id="limitMaxUser"
                min="2"
                max="20"
                class="mx-auto block p-2.5 w-2/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
            <div className="m-auto w-3/4 flex justify-center mt-2">
              <button className="text-center w-1/4"> Créer </button>
            </div>
          </form>
        </div>
      </div>
      <div className="m-auto w-3/4 ">
        <div className="border p-2 max-h-64 overflow-scroll">
          <ul>
            <li className="flex">
              <p className="my-auto">NOM SALON</p>
              <div className="ml-auto">
                <Link to="/admin/salon/1">
                  <button> Modifier </button>
                </Link>
                <button> Supprimer </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM SALON</p>
              <div className="ml-auto">
                <button> Modifier </button> <button> Supprimer </button>
              </div>
            </li>
            <hr className="my-1" />
            <li className="flex">
              <p className="my-auto">NOM SALON</p>
              <div className="ml-auto">
                <button> Modifier </button> <button> Supprimer </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListeSalon;
