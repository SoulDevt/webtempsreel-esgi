import { useCallback, useState } from 'react';
import { serverUrl } from '../enums';
import { toast } from 'react-toastify';
import { StrHelper } from '../helpers';

const Notification = ({ nbConnexion }) => {
  const [formData, setFormData] = useState({ titre: '', message: '' });
  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData({ ...formData, [name]: value });
      setError(null);
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { titre, message } = formData;
    if (!titre.trim() || !message.trim()) return setError('Veuillez remplir tous les champs');
    try {
      const res = await fetch(`${serverUrl}/notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titre: titre.trim().capitalize(), message: message.trim(), status: 'created' })
      });
      setFormData({ titre: '', message: '' });
    } catch (error) {
      console.log(error);
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <>
      {/* <div className="Notification container mx-auto px-4 flex flex-col justify-center items-center">
        <h1>Envoyer une notification</h1>
        {nbConnexion ? <h2>Il y a actuellement : {nbConnexion} personnes connectés</h2> : <h2>Chargement...</h2>}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input id="titre" name="titre" type="text" value={formData.titre} onInput={handleChange} />
          <label htmlFor="message">Message</label>
          <input id="message" name="message" type="text" value={formData.message} onInput={handleChange} />
          <p>{error}</p>
          <button type="submit">Submit</button>
        </form>
      </div> */}

      <div className="m-auto w-3/4 ">
        <p className=""> Notifications commerciales </p>
        <div className="border p-2 max-h-68 overflow-scroll felx justify-center">
          {nbConnexion ? <h2>Il y a actuellement : {nbConnexion} personnes connectés</h2> : <h2>Chargement...</h2>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="titre" class="flex justify-center">
                Titre
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onInput={handleChange}
                class="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" class="flex justify-center">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onInput={handleChange}
                rows="4"
                class="mx-auto block p-2.5 w-2/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div>
            <p>{error}</p>
            <div className="m-auto w-3/4 flex justify-center mt-2">
              <button type="submit" className="text-center w-1/4">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Notification;
