import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, cardInfo: {}});
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''})
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
      .then(profileInfo => {
        setCurrentUser(profileInfo)
      })
      .catch(console.error)
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(console.error)
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id)
    api.toggleLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }).catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).catch(console.error)
    setCards((state) => state.filter((c) => c !== card))
  }


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

  function handleUpdateUser(name, description){
    api.patchProfileInfo(name, description).then((profileInfo) => {
      setCurrentUser(profileInfo);
      closeAllPopups();
    }).catch(console.error)
  };

  function handleUpdateAvatar(avatarLink){
    api.patchProfileAvatar(avatarLink).then((profileInfo) => {
      setCurrentUser(profileInfo);
      closeAllPopups();
    }).catch(console.error)
  };

  function handleAddPlace(name, link){
    api.postNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    }).catch(console.error)
  }

  return ( 
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />

        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />

        <AddPlacePopup onAddPlace={handleAddPlace} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />

        <PopupWithForm name='removeCard' title='Вы уверены?' buttonText='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </CurrentUserContext.Provider>

    </div>

  )
}


export default App;
