// import axios from 'axios'
import { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services';
import { AppContext, getFromToken } from '../contexts/app-context';
import { toast } from 'react-toastify';
import { Loader } from '../components';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      if (accessToken) navigate('/');
    }
    setLoading(false);
  }, []);

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
    setFormData({
      email: formData.email.trim(),
      password: formData.password.trim()
    });
    try {
      const res = await AuthService.login(formData);
      const data = getFromToken(res);
      setAccessToken(data);
      setFormData({ email: '', password: '' });
      toast.success('You have been logged in successfully !');
      if (data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.toString());
      // setError(err.response.data);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="auth">
          <h1>Login</h1>
          <form action="">
            <input type="text" placeholder="email" value={formData.email} onChange={handleChange} name="email" />
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account ? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
