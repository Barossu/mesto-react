import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js'

function Login({handleLogin}){
  const [formValue, setFormValue] = React.useState({email: '', password: ''})
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {password, email} = formValue;
    auth.register(password, email)
    auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token){
          setFormValue({email: '', password: ''});
          handleLogin();
          navigate('/main', {replace: true})
        }
      })
      .catch(console.error)
  };

  return (
    <div className='autonotification'>
      <h2 className='autonotification__form-text'>Вход</h2>
      <form onSubmit={handleSubmit} className='autonotification__form'>
        <input onChange={handleChange} value={formValue.email}  className='autonotification__input' name='email' type="email" placeholder='Email' required />
        <input onChange={handleChange} value={formValue.password}  className='autonotification__input' name='password' type="password" placeholder='Пароль' required />
        <button className='autonotification__submit' type="submit">Войти</button>
      </form>
    </div>
  )
};

export default Login