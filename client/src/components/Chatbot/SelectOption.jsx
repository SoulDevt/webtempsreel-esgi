const SelectOption = ({ options, chosenOption }) => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-700">Sélectionner votre demande :</p>
      <div className="flex flex-wrap">
        {options.map((option) => (
          <button
            className="mr-2 mb-2 'dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300'"
            key={option.id}
            onClick={() => chosenOption(option)}>
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
