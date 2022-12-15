import { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from '../services';
import { AppContext } from '../contexts/app-context';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  });

  const [err, setError] = useState(null);
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = name === 'isAdmin' ? event.target.checked : event.target.value;
      setFormData({ ...formData, [name]: value });
      setError(null);
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormData({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim()
      });
      const res = await AuthService.register(formData);
      setFormData({ username: '', email: '', password: '', isAdmin: false });
      if (typeof res === 'boolean') {
        toast.success('You have been registered successfully !');
        navigate('/login');
        return;
      }
      console.error(res);
    } catch (err) {
      setError(err.response.data);
    }
  };

  useEffect(() => {
    if (accessToken) navigate('/');
  }, [accessToken]);

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input required type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="isAdmin">Conseiller :</label>
        <input type="checkbox" name="isAdmin" id="isAdmin" value={formData.isAdmin} onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
