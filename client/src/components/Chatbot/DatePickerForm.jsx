import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerForm = ({ choosenEvent, handleSubmit, handleDatePicker, handleTitle }) => {
  return (
  <form className="flex items-center w-full">
    <input
      type="text"
      placeholder="Titre de la réservation"
      className="border border-slate-800 rounded-md p-2 mr-3"
      name="title"
      value={choosenEvent.title}
      onInput={handleTitle}
    />
    <DatePicker
      name="date"
      selected={choosenEvent.date}
      onChange={handleDatePicker}
      value={choosenEvent.date}
      minDate={new Date()}
      dateFormat="dd/MM/yyyy"
      className="border border-slate-800 rounded-md p-2 z-10 relative"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={60}
      minTime={new Date().setHours(9, 0, 0)}
      maxTime={new Date().setHours(17, 0, 0)}
      timeCaption="Heure"
      placeholderText="Choisissez une date"
    />
    <button type="submit" className=" dark:text-gray-200 hover:text-gray-400 bg-slate-800" onClick={handleSubmit}>
      Valider
    </button>
    </form>
  )
};

export default DatePickerForm;
