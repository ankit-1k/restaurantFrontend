import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('a@g.co');
  const [password, setPassword] = useState('a');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log('Response:', response.data); // Check the response

      if (response.status === 200) {
        const { username, email } = response.data.user;
        alert(response.data.message);
        onLogin({ username, email }); // Pass user data to onLogin
        navigate('/home'); // Redirect to home
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
    }
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
