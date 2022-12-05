import { useCallback, useState } from 'react';
import { serverUrl } from '../enums';
import { toast } from 'react-toastify';
import { StrHelper } from '../helpers';

const Notification = ({nbConnexion}) => {
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
      <div className="Notification container mx-auto px-4 flex flex-col justify-center items-center">
        <h1>Envoyer une notification</h1>
        <h2>Il y a actuellement : {nbConnexion} personnes connectés</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input id="titre" name="titre" type="text" value={formData.titre} onInput={handleChange} />
          <label htmlFor="message">Message</label>
          <input id="message" name="message" type="text" value={formData.message} onInput={handleChange} />
          <p>{error}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Notification;
