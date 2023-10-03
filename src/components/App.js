import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, cardInfo: {}});

  function handleCardClick(cardInfo){
    setSelectedCard({isOpen: true, cardInfo: cardInfo})
  };

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  };
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  };
  
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  };

  function closeAllPopups(){
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({isOpen: false, cardInfo: {}})
  };


  return ( 
    <div className="page">
      
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name='editAvatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="popup__input-container"> 
          <input type="url" id="avatar-link-field" name="link" className="popup__input" placeholder="Новый аватар" required />
          <span className="popup__error" id="avatar-link-field-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm name='editProfile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>       
          <label className="popup__input-container">
            <input type="text" id="name-field"  name="name-field" className="popup__input popup__input_type_name" placeholder="Введите имя" required minLength="2" maxLength="40" />
            <span className="popup__error" id="name-field-error"></span>
          </label>
          <label className="popup__input-container"> 
            <input type="text" id="description-field" name="description-field" className="popup__input popup__input_type_description" placeholder="О себе" required minLength="2" maxLength="200" />
            <span className="popup__error" id="description-field-error"></span>
          </label>
      </PopupWithForm>

      <PopupWithForm name='addPlace' title='Новое место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__input-container">
            <input type="text" id="place-name-field" name="name" className="popup__input" placeholder="Название" required minLength="2" maxLength="30" /> 
            <span className="popup__error" id="place-name-field-error"></span>
          </label>
          <label className="popup__input-container"> 
            <input type="url" id="image-link-field" name="link" className="popup__input" placeholder="Ссылка на картинку" required />
            <span className="popup__error" id="image-link-field-error"></span>
          </label>
      </PopupWithForm>

      <PopupWithForm name='removeCard' title='Вы уверены?' buttonText='Да' />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>

  )
}


export default App;
