import React from "react";

function Card({card, onCardClick, onDeleteCard}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleDelete() {
    onDeleteCard(card);
  }

  return (
    <li className="elements__card">
      <button className="elements__del-card" onClick={handleDelete}></button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="elements__img"
      />
      <div className="elements__description">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-block">
          <button className="elements__like" type="button"></button>
          <p className="elements__number-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
