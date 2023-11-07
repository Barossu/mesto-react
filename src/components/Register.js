import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../auth.js'

function Register({checkRegister}){
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
      .then((data) => {
        checkRegister(data.data)
        if (data.data){
          navigate('/signin', {replace: true})
        }
      })
  };

  return (
    <div className='autonotification'>
      <h2 className='autonotification__form-text'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='autonotification__form'>
        <input onChange={handleChange} value={formValue.email} className='autonotification__input' name='email' type="email" placeholder='Email' required />
        <input onChange={handleChange} value={formValue.password} className='autonotification__input' name='password' type="password" placeholder='Пароль' required />
        <button className='autonotification__submit' type="submit">Зарегистрироваться</button>
      </form>
      <Link className='autonotification__singin-link' to='/signin'>Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register