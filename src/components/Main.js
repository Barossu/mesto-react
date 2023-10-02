import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props){
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then(profileInfo => {
        setUserName(profileInfo.name);
        setUserDescription(profileInfo.about);
        setUserAvatar(profileInfo.avatar);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(err => console.log(`Ошибка: ${err}`))
  }, [])

  return(
    <main className="content">

      <section className="profile">
        <button onClick={props.onEditAvatar} type="button" name="edit-avatar-button" aria-label="Изменить" className="profile__avatar-button">
          <img className="profile__avatar" alt="Аватар" src={userAvatar} />
          <div className="profile__avatar-edit"></div>
        </button>
        <div className="profile__info">
          <div className="profile__data">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="Изменить" name="edit-button"></button>
        </div>
          <button onClick={props.onAddPlace} type="button" name="add-button" aria-label="Добавить" className="profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Карточки с фото">
        {cards.map((cardInfo, i) => (
          <article className="elements__element" key={i}>
            <Card onCardClick={props.onCardClick} card={cardInfo} />
          </article>
        ))}
      </section>

    </main>
  )
}

export default Main