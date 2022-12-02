import { useEffect, useCallback, useState } from 'react';
import { serverUrl } from '../enums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Toast } from '../components';

const Test = () => {
  const [formData, setFormData] = useState({ titre: '', message: '', status: 'empty' });

  useEffect(() => {
    const source = new EventSource(`${serverUrl}/sse/notification`);
    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });
    source.addEventListener('notification', async (e) => {
      const { data } = JSON.parse(e.data);
      if (data?.status === 'new') {
        const content = <Toast titre={data?.titre} message={data?.message} />;
        toast(content, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        setFormData({ titre: '', message: '', status: 'empty' });
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
          body: JSON.stringify({...formData, status: 'new'})
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
    <>
      <ToastContainer />
      <div className="Test container mx-auto px-4 flex flex-col justify-center items-center">
        <h1>Test sse</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input id="titre" name="titre" type="text" value={formData.titre} onChange={handleChange} />
          <label htmlFor="message">Message</label>
          <input id="message" name="message" type="text" value={formData.message} onChange={handleChange} />
          {formData.titre} {formData.message}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Test;
