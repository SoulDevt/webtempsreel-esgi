const Step1 = ({ chosenOption }) => {
  const choseOption = [
    {
      id: 1,
      name: 'Entretien de son véhicule'
    },
    {
      id: 2,
      name: 'Informations sur les véhicules'
    },
    {
      id: 3,
      name: 'Informations de contact'
    },
    {
      id: 4,
      name: 'Pas de demande'
    }
  ];
  return (
    <div className="flex flex-col">
      <p className="text-gray-700">Sélectionner votre demande :</p>
      <div className="flex flex-wrap">
        {choseOption.map((option) => (
          <button
            className="mr-2 mb-2 'dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300'"
            key={option.id}
            onClick={() => chosenOption(option.id)}>
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
