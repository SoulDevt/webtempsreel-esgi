import { useEffect, useCallback, useState } from 'react';
import { serverUrl } from '../enums';

const Test = () => {
  const [formData, setFormData] = useState({ titre: '', message: '' });
  const [test, setTest] = useState(null);

  useEffect(() => {
    const source = new EventSource(`${serverUrl}/sse/notification`);
    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });
    source.addEventListener('notification', (e) => {
      
      const { data } = JSON.parse(e.data);
      //TODO : handle status
      if (data?.status) {
        setTest(data);
      }
    });

    return () => {
      source.close();
    };
  }, []);

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let res = await fetch(`${serverUrl}/sse/notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        // let data = await res.json();
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    [formData]
  );

  return (
    <div className="Test container mx-auto px-4 flex flex-col justify-center items-center">
      <h1>Test sse</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <input id="titre" name="titre" type="text" onChange={handleChange} />
        <label htmlFor="message">Message</label>
        <input id="message" name="message" type="text" onChange={handleChange} />
        {formData.titre} {formData.message}
        <button type="submit">Submit</button>
      </form>
      <p>{ test && test.titre }</p>
      <p>{ test && test.message }</p>
    </div>
  );
};

export default Test;
