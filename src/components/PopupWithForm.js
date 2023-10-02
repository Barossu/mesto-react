import React from 'react';


function PopupWithForm(props){
  return(
    <div className={props.isOpen ? `popup popup_opened popup_type_${props.name}` : `popup popup_type_${props.name}`}>
        <div className="popup__container">
          <button onClick={props.onClose} type="button" className="popup__close-icon" aria-label="Закрыть" name="close-button"></button>
          <h2 className="popup__form-text">{props.title}</h2>
          <form className="popup__form" id="popup-edit-form" name={props.name} noValidate>
            {props.children}
            <button type="submit" className="popup__button" name="submit-button">{props.buttonText}</button>
          </form>
        </div>        
      </div>
  )
};

export default PopupWithForm;