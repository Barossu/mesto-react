import React from 'react';

function Card(props){
  // console.log(props.onCardClick)
  function handleClick(){
    props.onCardClick(props.card)
  }

  return(
    <>
      <img onClick={handleClick} className="elements__image" src={props.card.link} alt={`Изображение: ${props.card.name}`} />
      <button type="button" className="elements__remove-button" aria-label="Удалить" name="remove-button"></button>
      <div className="elements__info">
        <h2 className="elements__place">{props.card.name}</h2>
        <div className="elements__like-container">
          <button type="button" name="like-button" aria-label="Лайк" className="elements__like"></button>
          <p className="elements__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </>
  )
}

export default Card;