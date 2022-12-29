import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import { isLastEntretienBeforeAYear } from '../../helpers';
import { toast } from 'react-toastify';

const EntretienForm = ({ submit }) => {
  const [date, setDate] = useState();
  const handleDatePicker = useCallback(
    (value) => {
      setDate(value);
    },
    [date]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const res = isLastEntretienBeforeAYear(date);
      if (typeof res === 'string') {
        setDate('');
        return toast.error(res);
      }
      submit(res);
    },
    [date]
  );
  return (
    <form className="flex items-center w-full">
      <DatePicker
        name="date"
        selected={date}
        onChange={handleDatePicker}
        value={date}
        maxDate={new Date()}
        showYearDropdown
        dateFormatCalendar="MMMM"
        yearDropdownItemNumber={10}
        scrollableYearDropdown
        dateFormat="dd/MM/yyyy"
        className="border border-slate-800 rounded-md p-2 z-10 relative"
        placeholderText="Choisissez une date"
      />
      <button
        className=" dark:text-gray-200 hover:text-gray-400 bg-slate-800 mr-3"
        onClick={handleSubmit}
        type="submit">
        Valider
      </button>
      <button
        className=" dark:text-gray-200 hover:text-gray-400 bg-slate-800"
        onClick={(e) => {
          e.preventDefault();
          submit('Retour');
        }}>
        Retour
      </button>
    </form>
  );
};
export default EntretienForm;
