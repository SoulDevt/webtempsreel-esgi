import { useCallback, useState } from 'react';

const KilometerForm = ({ submit }) => {
  const [nbKilometer, setNbKilometer] = useState(0);
  const limitKilometer = 10000;

  const handleInput = useCallback(
    (e) => {
      setNbKilometer(e.target.value);
    },
    [nbKilometer]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit(nbKilometer >= limitKilometer);
    },
    [nbKilometer]
  );
  return (
    <form className="flex items-center w-full">
      <input
        type="number"
        name="nbKilometer"
        placeholder="Nombre de kilomètres parcourus"
        className="border border-slate-800 rounded-md p-2 mr-3"
        onInput={handleInput}
        value={nbKilometer}
      />
      <button className="dark:text-gray-200 hover:text-gray-400 bg-slate-800 mr-3" onClick={handleSubmit} type="submit">
        Valider
      </button>
    </form>
  );
};
export default KilometerForm;
